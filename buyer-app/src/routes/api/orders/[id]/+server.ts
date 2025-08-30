import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export const GET: RequestHandler = async ({ params, request }) => {
  if (!SUPABASE_URL || params.id.startsWith('stub-')) {
    const total = 3000;
    const stub = {
      id: params.id,
      status: 'pending',
      delivery_date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      total_naira: total,
      payment_status: 'unpaid',
      payment_proof_url: null,
      order_items: [
        { id: `oi-${Date.now()}`, order_id: params.id, product_id: 'stub-eggs', qty: 2, unit_price_naira: 1500, subtotal_naira: total }
      ]
    };
    return new Response(JSON.stringify(stub), { headers: { 'content-type': 'application/json' } });
  }
  // Prefer RLS with user token if provided
  const auth = request.headers.get('authorization');
  if (ANON_KEY && auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.slice(7);
    const supabase = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const { data: order, error } = await supabase.from('orders').select('*, order_items(*)').eq('id', params.id).single();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 404 });
    return new Response(JSON.stringify(order), { headers: { 'content-type': 'application/json' } });
  }
  // Fallback to service role (non-RLS)
  if (!SERVICE_KEY) {
    return new Response(JSON.stringify({ error: 'Service key missing and no user token provided' }), { status: 400 });
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data: order, error } = await supabase.from('orders').select('*, order_items(*)').eq('id', params.id).single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 404 });
  return new Response(JSON.stringify(order), { headers: { 'content-type': 'application/json' } });
};

export const PATCH: RequestHandler = async ({ params, request }) => {
  const body = await request.json();
  const { status } = body;
  if (!SUPABASE_URL || !SERVICE_KEY) return new Response(JSON.stringify({ ok: true, stub: true }));
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const { error } = await supabase.from('orders').update({ status }).eq('id', params.id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ ok: true }));
};
