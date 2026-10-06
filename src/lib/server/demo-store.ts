import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { demoApplications, type DemoApplication } from "@/lib/demo-data";
import type { SavedRequest } from "@/lib/request-schema";
let database: DatabaseSync | undefined;
function db() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_DEMO_BACKEND !== "true"
  )
    throw new Error("DEMO_DISABLED");
  if (database) return database;
  const directory = process.env.DEMO_DATA_DIR || join(process.cwd(), "data");
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  database = new DatabaseSync(join(directory, "preview.sqlite"));
  database.exec(
    `PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS requests(id TEXT PRIMARY KEY, payload TEXT NOT NULL); CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);`,
  );
  const insert = database.prepare(
    "INSERT OR IGNORE INTO requests(id,payload) VALUES(?,?)",
  );
  for (const record of demoApplications)
    insert.run(record.id, JSON.stringify(record));
  return database;
}
export type StoredRequest = DemoApplication & {
  createdAt?: string;
  updatedAt?: string;
  events?: { status: string; at: string }[];
  enquiry?: SavedRequest;
};
export function records(): StoredRequest[] {
  return db()
    .prepare("SELECT payload FROM requests ORDER BY rowid DESC")
    .all()
    .map((row) => JSON.parse(String(row.payload)));
}
export function createRequest(input: SavedRequest) {
  if (records().length >= 250) throw new Error("DEMO_FULL");
  // Passport numbers and clinical records must never enter the demo store.
  const { passport: _passport, ...safeDetails } = input.details;
  const createdAt = new Date().toISOString();
  const labels = {
    visa: `${input.purpose} visa & permit support`,
    transfers: "Airport transfer",
    medical: "Medical visit coordination",
    vacations: "Stay & vacation enquiry",
    esim: "Connectivity & eSIM guidance",
  };
  const record: StoredRequest = {
    id: `REQ-${randomUUID()}`,
    client: input.personal.name,
    service: labels[input.service],
    date: new Date(createdAt).toLocaleDateString("en-GB"),
    status: "Submitted",
    amount: 0,
    createdAt,
    updatedAt: createdAt,
    events: [{ status: "Submitted", at: createdAt }],
    enquiry: { ...input, details: safeDetails },
  };
  db()
    .prepare("INSERT INTO requests(id,payload) VALUES(?,?)")
    .run(record.id, JSON.stringify(record));
  return record;
}
export function updateStatus(id: string, status: string) {
  const row = db().prepare("SELECT payload FROM requests WHERE id=?").get(id);
  if (!row) return null;
  const record: StoredRequest = JSON.parse(String(row.payload));
  const at = new Date().toISOString();
  const next = {
    ...record,
    status,
    updatedAt: at,
    events: [...(record.events || []), { status, at }],
  };
  db()
    .prepare("UPDATE requests SET payload=? WHERE id=?")
    .run(JSON.stringify(next), id);
  return next;
}
export function setting(key: string) {
  return String(
    db().prepare("SELECT value FROM settings WHERE key=?").get(key)?.value ||
      "",
  );
}
export function setSetting(key: string, value: string) {
  db()
    .prepare(
      "INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value",
    )
    .run(key, value);
}
