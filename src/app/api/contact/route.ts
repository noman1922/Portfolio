import { NextResponse } from 'next/server';

type Body = {
  name?: string;
  email?: string;
  budget?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const { name, email, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: 'Server misconfiguration: missing RESEND_API_KEY' }, { status: 500 });
    }
    if (!CONTACT_EMAIL) {
      return NextResponse.json({ error: 'Server misconfiguration: missing CONTACT_EMAIL' }, { status: 500 });
    }

    const subject = `Portfolio contact from ${name}`;
    const html = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    const payload = {
      from: `"${name}" <${CONTACT_EMAIL}>`,
      to: [CONTACT_EMAIL],
      subject,
      html
    };

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Failed to send email: ${text}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
