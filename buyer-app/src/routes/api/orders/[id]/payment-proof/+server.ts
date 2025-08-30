import type { RequestHandler } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const POST: RequestHandler = async ({ params, request }) => {
  const form = await request.formData();
  const file = form.get('file') as File | null;
  if (!file) return new Response(JSON.stringify({ error: 'file missing' }), { status: 400 });

  // If envs are missing, stub a URL and mark status
  if (!SUPABASE_URL || !SERVICE_KEY) {
    const fakeUrl = 'https://picsum.photos/seed/payment-proof/800/600';
    return new Response(JSON.stringify({ url: fakeUrl, stub: true }), { headers: { 'content-type': 'application/json' } });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // Ensure bucket exists (ignore errors if already exists)
  try { await supabase.storage.createBucket('payment-proofs', { public: true }); } catch {}

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  const path = `${params.id}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from('payment-proofs').upload(path, bytes, {
    contentType: file.type || 'application/octet-stream',
    upsert: true
  });
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const { data: pub } = supabase.storage.from('payment-proofs').getPublicUrl(data.path);

  // Persist on order
  await supabase.from('orders').update({ payment_proof_url: pub.publicUrl, payment_status: 'submitted' }).eq('id', params.id);

  return new Response(JSON.stringify({ url: pub.publicUrl }), { headers: { 'content-type': 'application/json' } });
};
