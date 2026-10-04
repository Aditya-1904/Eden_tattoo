import { Resend } from "resend";
import { site } from "@/content/site";
import { styleName, type StyleId } from "@/content/work";
import { enquirySchema, enquirySummary, MAX_FILES } from "@/lib/enquiry";

const MAX_FILE_BYTES = 1.5 * 1024 * 1024; // images are compressed in the browser first; Vercel caps bodies at 4.5 MB

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("data") ?? "{}"));
  } catch {
    return Response.json({ ok: false, error: "Invalid data" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please check the form and try again." }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot filled → pretend success, send nothing.
  if (data.company) return Response.json({ ok: true });

  const files = form
    .getAll("files")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_FILES);
  for (const f of files) {
    if (!f.type.startsWith("image/") || f.size > MAX_FILE_BYTES) {
      return Response.json({ ok: false, error: "Reference images must be photos under 1.5 MB each." }, { status: 422 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured yet — tell the client to fall back to WhatsApp.
    return Response.json({ ok: false, fallback: true, error: "Email delivery is not configured." }, { status: 503 });
  }

  const summary = enquirySummary(data, (id) => styleName(id as StyleId));
  const digits = data.phone.replace(/\D/g, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "Eden Tattoos Website <onboarding@resend.dev>",
      to: (process.env.ENQUIRY_TO_EMAIL ?? site.email).split(",").map((s) => s.trim()),
      replyTo: data.email || undefined,
      subject: `Tattoo enquiry — ${data.name} (${data.placement}, ${data.styles.map((s) => styleName(s as StyleId)).join(", ")})`,
      text: summary,
      html: `<div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#111;max-width:640px">
        <h1 style="font-weight:400;font-size:28px;margin:0 0 16px">New tattoo enquiry</h1>
        <pre style="font-family:inherit;white-space:pre-wrap;margin:0">${escape(summary)}</pre>
        <p style="margin-top:24px"><a href="https://wa.me/${waNumber}">Reply on WhatsApp →</a></p>
      </div>`,
      attachments: await Promise.all(
        files.map(async (f, i) => ({
          filename: f.name || `reference-${i + 1}.jpg`,
          content: Buffer.from(await f.arrayBuffer()),
        })),
      ),
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return Response.json({ ok: false, fallback: true, error: "We couldn't send your enquiry." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
