import { Resend } from 'npm:resend';


export function sendEmail(html: string): void {
  const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

  console.log('sending email...');
  resend.emails.send({
    from: Deno.env.get("FROM_EMAIL"),
    to: Deno.env.get("TO_EMAIL"),
    subject: Deno.env.get("SUBJECT"),
    html: html
  });
  console.log('email sent.');
}