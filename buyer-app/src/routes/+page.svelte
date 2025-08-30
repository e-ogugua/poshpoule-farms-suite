<script>
  import { onMount } from 'svelte';
  let loading = true;
  let products = [];
  onMount(async () => {
    try {
      const res = await fetch('/api/products');
      products = await res.json();
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  });

  async function submitOrder(e, product_id) {
    e.preventDefault();
    const form = e.target;
    const fd = new FormData(form);
    fd.set('product_id', product_id);
    const res = await fetch('/api/orders', { method: 'POST', body: fd });
    const data = await res.json();
    if (res.ok && data.id) {
      window.location.href = `/orders/${data.id}`;
    } else {
      alert(data.error || 'Failed to create order');
    }
  }
</script>

<svelte:head><title>Buyer — PoshPOULE</title></svelte:head>

<section class="relative overflow-hidden">
  <div class="mx-auto max-w-6xl px-4 py-12 md:py-16">
    <div class="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
          Farm‑fresh poultry, delivered when you need it
        </h1>
        <p class="mt-3 text-gray-600">
          Order premium eggs and chicken from PoshPOULE Farms. Simple checkout, status updates, and proof of payment upload.
        </p>
        <div class="mt-6 flex gap-3">
          <a href="#shop" class="inline-flex items-center justify-center rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Shop now</a>
          <a href="/about" class="inline-flex items-center justify-center rounded border px-4 py-2 hover:border-emerald-600 hover:text-emerald-700">Learn more</a>
        </div>
      </div>
      <div class="hidden md:block">
        <div class="aspect-video rounded-xl bg-gradient-to-br from-emerald-50 to-white border flex items-center justify-center">
          <div class="text-emerald-700 font-semibold">PoshPOULE</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="shop" class="max-w-6xl mx-auto px-4 pb-12">
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-semibold">Shop Products</h2>
    <a href="/orders/stub-new" class="text-sm text-emerald-700 hover:underline">View my orders</a>
  </div>

  {#if loading}
    <div class="grid md:grid-cols-3 gap-4 mt-4">
      {#each Array(6) as _}
        <div class="border rounded p-3 animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="h-4 bg-gray-100 rounded w-1/3 mt-2"></div>
          <div class="h-8 bg-gray-100 rounded w-full mt-4"></div>
        </div>
      {/each}
    </div>
  {:else if products.length === 0}
    <div class="mt-6 text-gray-600">No products available yet. Please check back soon.</div>
  {:else}
    <div class="grid md:grid-cols-3 gap-4 mt-4">
      {#each products as p}
        <div class="border rounded-lg p-4 hover:shadow-sm transition">
          <div class="font-medium">{p.name}</div>
          <div class="text-emerald-700 font-semibold mt-1">₦{p.price_naira}</div>
          <form class="mt-3 space-y-2" on:submit={(e)=>submitOrder(e, p.id)}>
            <input type="number" name="qty" min="1" class="border rounded px-2 py-1 w-full" placeholder="Quantity" required>
            <input type="date" name="delivery_date" class="border rounded px-2 py-1 w-full" required>
            <button class="w-full px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Create Order</button>
          </form>
        </div>
      {/each}
    </div>
  {/if}
</section>
