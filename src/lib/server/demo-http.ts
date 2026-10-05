export function guard(request: Request) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_DEMO_BACKEND !== "true"
  )
    return Response.json(
      { error: "The preview backend is disabled." },
      { status: 503 },
    );
  if (request.method !== "GET") {
    const origin = request.headers.get("origin");
    let sameHost = false;
    try {
      sameHost =
        !!origin && new URL(origin).host === request.headers.get("host");
    } catch {}
    if (!sameHost)
      return Response.json(
        { error: "Request origin is not allowed." },
        { status: 403 },
      );
    if (!request.headers.get("content-type")?.startsWith("application/json"))
      return Response.json({ error: "JSON required." }, { status: 415 });
    if (Number(request.headers.get("content-length") || 0) > 20000)
      return Response.json({ error: "Request is too large." }, { status: 413 });
  }
}
export async function body(request: Request) {
  const raw = await request.text();
  if (Buffer.byteLength(raw) > 20000) throw new Error("Request too large");
  return JSON.parse(raw);
}
