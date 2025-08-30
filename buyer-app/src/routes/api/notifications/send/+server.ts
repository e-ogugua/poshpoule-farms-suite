import type { RequestHandler } from '@sveltejs/kit';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID; // e.g. '1234567890'
const TWILIO_SID = process.env.TWILIO_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_FROM; // e.g. '+1XXXXXXXXXX'

async function sendWhatsApp(to: string, template: string, vars: Record<string, string> = {}) {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID) {
    console.log('[notify:whatsapp:stub]', { to, template, vars });
    return { ok: true, stub: true };
  }
  const components = Object.keys(vars).length
    ? [{ type: 'body', parameters: Object.values(vars).map((v) => ({ type: 'text', text: String(v) })) }]
    : [];
  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: { name: template, language: { code: 'en_US' }, components }
  };
  const url = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_ID}/messages`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error('[notify:whatsapp:error]', res.status, txt);
    return { ok: false, status: res.status };
  }
  return { ok: true };
}

async function sendTwilioSms(to: string, body: string) {
  if (!TWILIO_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM) {
    console.log('[notify:sms:stub]', { to, body });
    return { ok: true, stub: true };
  }
  const auth = Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64');
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`;
  const form = new URLSearchParams({ From: TWILIO_FROM, To: to, Body: body });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error('[notify:sms:error]', res.status, txt);
    return { ok: false, status: res.status };
  }
  return { ok: true };
}

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { to, template = 'order_update', vars = {}, smsFallback = true } = body;
  const wa = await sendWhatsApp(to, template, vars);
  let sms = { ok: true } as any;
  if (!wa.ok && smsFallback) {
    const text = `Order update: ${Object.values(vars).join(' ')}`;
    sms = await sendTwilioSms(to, text);
  }
  return new Response(JSON.stringify({ ok: wa.ok || sms.ok, wa, sms }), { headers: { 'content-type': 'application/json' } });
};
