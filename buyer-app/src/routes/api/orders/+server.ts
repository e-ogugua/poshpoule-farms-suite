import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function decrementStock(product_id: string, qty: number) {
  if (!SUPABASE_URL || !SERVICE_KEY) return;
  const client = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data, error } = await client.rpc('decrement_stock', { p_product_id: product_id, p_qty: qty });
  if (error) throw error;
  return data;
}

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const product_id = String(form.get('product_id'));
  const qty = parseInt(String(form.get('qty') || '1'));
  const delivery_date = String(form.get('delivery_date') || '');

  if (!SUPABASE_URL || !SERVICE_KEY) {
    // Stub path: compute price from known SKUs
    const priceMap: Record<string, number> = {
      'stub-eggs': 1500,
      'stub-bird': 3800,
      'stub-compost': 2500,
      'stub-feed': 18000,
      'stub-chicks': 12000,
    };
    const unit = priceMap[product_id] ?? 1500;
    const total = unit * qty;
    const fakeId = `stub-${Date.now()}`;
    console.log('[order:stub] created', { id: fakeId, total, delivery_date });
    return new Response(JSON.stringify({ id: fakeId, total_naira: total }), { headers: { 'content-type': 'application/json' } });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  // price
  const { data: prod, error: perr } = await supabase.from('products').select('id, price_naira, stock_qty').eq('id', product_id).single();
  if (perr || !prod) return new Response(JSON.stringify({ error: perr?.message || 'Product not found' }), { status: 400 });
  if (prod.stock_qty < qty) return new Response(JSON.stringify({ error: 'Insufficient stock' }), { status: 400 });

  const total = prod.price_naira * qty;
  const { data: order, error } = await supabase.from('orders').insert({ total_naira: total, status: 'pending', delivery_date }).select('*').single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const { error: oiErr } = await supabase.from('order_items').insert({ order_id: order.id, product_id, qty, unit_price_naira: prod.price_naira, subtotal_naira: total });
  if (oiErr) return new Response(JSON.stringify({ error: oiErr.message }), { status: 500 });

  // decrement stock via RPC (created in SQL below) or fallback update
  try { await decrementStock(product_id, qty); }
  catch { await supabase.from('products').update({ stock_qty: prod.stock_qty - qty }).eq('id', product_id); }

  // notify stub
  console.log('[notify] new order', { order_id: order.id, total });

  return new Response(JSON.stringify({ id: order.id, total_naira: total }), { headers: { 'content-type': 'application/json' } });
};
