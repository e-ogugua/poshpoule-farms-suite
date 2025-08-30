<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';
</script>

<header class="border-b bg-white/80 backdrop-blur">
  <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
    <a href="/" class="flex items-center gap-2 font-semibold text-emerald-700">
      <span class="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-1"></span>
      PoshPOULE
    </a>
    <nav class="hidden md:flex items-center gap-6 text-sm">
      <a href={base + '/'} class="hover:text-emerald-700">Home</a>
      <a href={base + '/orders/stub-new'} class="hover:text-emerald-700">My Orders</a>
      <a href={base + '/about'} class="hover:text-emerald-700">About</a>
      <a href="/" class="hover:text-emerald-700">Public Site</a>
    </nav>
  </div>
  <div class="md:hidden border-t px-4 py-2 text-sm">
    <div class="flex gap-4">
      <a href={base + '/'} class="hover:text-emerald-700">Home</a>
      <a href={base + '/orders/stub-new'} class="hover:text-emerald-700">Orders</a>
      <a href={base + '/about'} class="hover:text-emerald-700">About</a>
      <a href="/" class="hover:text-emerald-700">Public</a>
    </div>
  </div>
  </header>

<main class="min-h-[70vh]">
  <slot />
</main>

<footer class="border-t bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
    <div>© {new Date().getFullYear()} PoshPOULE Farms</div>
    <div class="flex gap-4">
      <a class="hover:text-emerald-700" href="{base}/privacy">Privacy</a>
      <a class="hover:text-emerald-700" href="{base}/terms">Terms</a>
      <a class="hover:text-emerald-700" href="mailto:support@poshpoule.com">Contact</a>
    </div>
  </div>
</footer>
