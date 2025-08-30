<script>
  import { onMount } from 'svelte';
  export let params;
  let order = null;
  let file = null;
  let message = '';

  onMount(async () => {
    const res = await fetch(`/api/orders/${params.id}`);
    order = await res.json();
  });

  async function uploadProof(e) {
    e.preventDefault();
    if (!file) { message = 'Select an image or PDF'; return; }
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`/api/orders/${params.id}/payment-proof`, { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok) {
      message = 'Payment proof uploaded. Thank you!';
      order.payment_proof_url = data.url;
      order.payment_status = 'submitted';
    } else {
      message = data.error || 'Upload failed';
    }
  }
</script>

<section class="max-w-xl mx-auto p-4 space-y-4">
  <h1 class="text-xl font-semibold">Order #{params.id}</h1>
  {#if order}
    <div class="border rounded p-3">
      <div class="text-sm text-gray-600">Status: {order.status}</div>
      <div>Total: ₦{order.total_naira}</div>
      <div>Delivery: {order.delivery_date}</div>
      {#if order.payment_proof_url}
        <a class="text-emerald-700 underline" href={order.payment_proof_url} target="_blank">View payment proof</a>
      {/if}
    </div>
  {/if}

  <form on:submit|preventDefault={uploadProof} class="border rounded p-3 space-y-2">
    <label class="block text-sm" for="payment-proof-input">Upload payment proof (image or PDF)</label>
    <input id="payment-proof-input" type="file" accept="image/*,application/pdf" on:change={(e)=>file=e.target.files?.[0]||null} class="block" />
    <button class="px-3 py-1.5 bg-emerald-600 text-white rounded">Submit Proof</button>
    {#if message}<div class="text-sm text-gray-600">{message}</div>{/if}
  </form>
</section>
