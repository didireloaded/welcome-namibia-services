import { requestSchema } from "@/lib/request-schema";
import { createRequest, records, updateStatus } from "@/lib/server/demo-store";
import { guard, body } from "@/lib/server/demo-http";
import { z } from "zod";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  return Response.json(
    { records: records() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function POST(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  try {
    const parsed = requestSchema.safeParse(await body(request));
    if (!parsed.success)
      return Response.json(
        { error: "Check your request details." },
        { status: 400 },
      );
    return Response.json(
      { record: createRequest(parsed.data) },
      { status: 201 },
    );
  } catch {
    return Response.json(
      { error: "The request could not be saved. Please try again." },
      { status: 400 },
    );
  }
}
export async function PATCH(request: Request) {
  const denied = guard(request);
  if (denied) return denied;
  try {
    const input = z
      .object({
        id: z.string().max(80),
        status: z.enum([
          "Submitted",
          "Under review",
          "Documents needed",
          "Submitted to authority",
          "Decision recorded",
          "Confirmed",
        ]),
      })
      .strict()
      .parse(await body(request));
    const record = updateStatus(input.id, input.status);
    return record
      ? Response.json({ record })
      : Response.json({ error: "Request not found." }, { status: 404 });
  } catch {
    return Response.json({ error: "Invalid status update." }, { status: 400 });
  }
}
