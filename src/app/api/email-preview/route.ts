import { contactAcknowledgement, contactNotification } from "@/lib/email/templates";

/**
 * Renders the contact emails in a browser so they can be looked at without
 * sending anything.
 *
 *   /api/email-preview              the message the troop receives
 *   /api/email-preview?t=ack        the acknowledgement the visitor receives
 *
 * Development only. In production this 404s, because an open endpoint that
 * renders arbitrary query text as HTML is a stored-XSS toy, and the preview is
 * of no use on a live site anyway.
 *
 * It is not a substitute for sending yourself a real one: Gmail and Outlook
 * both rewrite HTML on the way in. `npm run check:email -- you@example.com`
 * does that part.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const which = new URL(request.url).searchParams.get("t");
  const sample = {
    name: "Priya Raman",
    email: "priya.raman@example.com",
    scoutAge: "11, starting 6th grade",
    topic: "Joining the troop",
    message:
      "Hello! My son has just finished Webelos with Pack 466 and is looking for a troop " +
      "to cross over into this spring.\n\nHe is keen on backpacking and has been asking " +
      "about summer camp. Could we come along to a Tuesday meeting and see how it works? " +
      "We are in Santa Clara, five minutes away.\n\nThank you,\nPriya",
  };

  const mail = which === "ack" ? contactAcknowledgement(sample) : contactNotification(sample);

  return new Response(mail.html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
