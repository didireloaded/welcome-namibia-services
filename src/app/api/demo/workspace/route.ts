import { setting, setSetting } from "@/lib/server/demo-store";
import { guard, body } from "@/lib/server/demo-http";
import { z } from "zod";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  return Response.json(
    {
      driver: setting("driver") || "Not assigned",
      document: setting("document") || "Awaiting review",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function PATCH(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  try {
    const input = z
      .discriminatedUnion("key", [
        z.object({
          key: z.literal("driver"),
          value: z.enum([
            "Not assigned",
            "Sample driver A · vehicle DEMO-01",
            "Sample driver B · vehicle DEMO-02",
          ]),
        }),
        z.object({
          key: z.literal("document"),
          value: z.enum(["Awaiting review", "Verified", "Needs correction"]),
        }),
      ])
      .parse(await body(request));
    setSetting(input.key, input.value);
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "Invalid workspace update." },
      { status: 400 },
    );
  }
}
