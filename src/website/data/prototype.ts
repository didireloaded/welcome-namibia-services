import { z } from "zod";

const schema = z.object({
  booking: z.object({ date: z.string(), time: z.enum(["09:00", "11:00", "14:00"]), name: z.string().min(2), email: z.email() }).nullable(),
  documents: z.array(z.enum(["Travel preparation checklist", "Accommodation preferences", "Arrival details"])),
  quote: z.enum(["Pending", "Accepted", "Changes requested"]),
  delivered: z.array(z.string()),
});
export type Prototype = z.infer<typeof schema>;
export const initialPrototype: Prototype = { booking: null, documents: [], quote: "Pending", delivered: [] };
const key = "welcome-namibia-prototype-v1";
export function readPrototype(): Prototype {
  const raw = localStorage.getItem(key);
  if (!raw) return initialPrototype;
  const parsed = schema.safeParse(JSON.parse(raw));
  return parsed.success ? parsed.data : initialPrototype;
}
export function writePrototype(value: Prototype) {
  localStorage.setItem(key, JSON.stringify(schema.parse(value)));
}
