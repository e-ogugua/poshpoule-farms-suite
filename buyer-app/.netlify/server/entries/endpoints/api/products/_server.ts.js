import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const GET = async () => {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    const stub = [
      { id: "stub-eggs", sku: "EGG-TRAY-30", name: "Organic Free-Range Eggs", category: "eggs", price_naira: 1500, unit: "tray", stock_qty: 250 },
      { id: "stub-bird", sku: "CHK-BIRD", name: "Farm-Ready Chicken", category: "poultry", price_naira: 3800, unit: "bird", stock_qty: 120 },
      { id: "stub-compost", sku: "COMP-25KG", name: "Organic Compost 25kg", category: "fertilizer", price_naira: 2500, unit: "bag", stock_qty: 75 },
      { id: "stub-feed", sku: "FEED-50KG", name: "Layer Feed 50kg", category: "feed", price_naira: 18e3, unit: "sack", stock_qty: 40 },
      { id: "stub-chicks", sku: "CHICKS-20", name: "Starter Chicks (20)", category: "poultry", price_naira: 12e3, unit: "pack", stock_qty: 200 }
    ];
    return new Response(JSON.stringify(stub), { headers: { "content-type": "application/json" } });
  }
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data, error } = await supabase.from("products").select("*").order("name");
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } });
};
export {
  GET
};
