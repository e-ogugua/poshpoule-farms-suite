<script lang="ts">
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-b from-white via-white to-slate-50">
  <header class="sticky top-0 z-30 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <a href="/" class="inline-flex items-center gap-2">
        <span class="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
        <span class="font-semibold tracking-tight">PoshPOULE</span>
        <span class="hidden sm:inline text-xs text-gray-500">Farms</span>
      </a>
      <nav class="hidden md:flex items-center gap-6 text-sm text-gray-600">
        <a class="hover:text-gray-900 transition-colors" href="/products">Products</a>
        <a class="hover:text-gray-900 transition-colors" href="https://poshpoule-dashboard.netlify.app" rel="noopener">Dashboard</a>
        <a class="hover:text-gray-900 transition-colors" href="https://poshpoule-partner.netlify.app" rel="noopener">Partners</a>
        <a class="hover:text-gray-900 transition-colors" href="/buyer" rel="noopener">Buyer App</a>
      </nav>
      <a href="/products" class="inline-flex h-9 items-center rounded-lg bg-emerald-600 px-3 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
        Explore
      </a>
    </div>
  </header>
  <main class="flex-1">
    <slot />
  </main>
  <footer class="border-t">
    <div class="max-w-6xl mx-auto px-4 py-8 text-xs text-center text-gray-500">
      © {new Date().getFullYear()} PoshPOULE Farms Ltd · Organic eggs · Healthy birds · Transparent farming
    </div>
  </footer>
</div>
