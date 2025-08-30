import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const GET = async ({ params, request }) => {
  if (!SUPABASE_URL || params.id.startsWith("stub-")) {
    const total = 3e3;
    const stub = {
      id: params.id,
      status: "pending",
      delivery_date: new Date(Date.now() + 864e5).toISOString().slice(0, 10),
      total_naira: total,
      payment_status: "unpaid",
      payment_proof_url: null,
      order_items: [
        { id: `oi-${Date.now()}`, order_id: params.id, product_id: "stub-eggs", qty: 2, unit_price_naira: 1500, subtotal_naira: total }
      ]
    };
    return new Response(JSON.stringify(stub), { headers: { "content-type": "application/json" } });
  }
  const auth = request.headers.get("authorization");
  if (ANON_KEY && auth && auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7);
    const supabase2 = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const { data: order2, error: error2 } = await supabase2.from("orders").select("*, order_items(*)").eq("id", params.id).single();
    if (error2) return new Response(JSON.stringify({ error: error2.message }), { status: 404 });
    return new Response(JSON.stringify(order2), { headers: { "content-type": "application/json" } });
  }
  if (!SERVICE_KEY) {
    return new Response(JSON.stringify({ error: "Service key missing and no user token provided" }), { status: 400 });
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data: order, error } = await supabase.from("orders").select("*, order_items(*)").eq("id", params.id).single();
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 404 });
  return new Response(JSON.stringify(order), { headers: { "content-type": "application/json" } });
};
const PATCH = async ({ params, request }) => {
  const body = await request.json();
  const { status } = body;
  if (!SUPABASE_URL || !SERVICE_KEY) return new Response(JSON.stringify({ ok: true, stub: true }));
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const { error } = await supabase.from("orders").update({ status }).eq("id", params.id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  return new Response(JSON.stringify({ ok: true }));
};
export {
  GET,
  PATCH
};
