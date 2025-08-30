import { c as create_ssr_component } from "../../chunks/ssr.js";
import { e as escape } from "../../chunks/escape.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<header class="border-b bg-white/80 backdrop-blur" data-svelte-h="svelte-12l80x3"><div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between"><a href="/" class="flex items-center gap-2 font-semibold text-emerald-700"><span class="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-1"></span>
      PoshPOULE</a> <nav class="hidden md:flex items-center gap-6 text-sm"><a href="/" class="hover:text-emerald-700">Home</a> <a href="/orders/stub-new" class="hover:text-emerald-700">My Orders</a> <a href="/about" class="hover:text-emerald-700">About</a></nav></div> <div class="md:hidden border-t px-4 py-2 text-sm"><div class="flex gap-4"><a href="/" class="hover:text-emerald-700">Home</a> <a href="/orders/stub-new" class="hover:text-emerald-700">Orders</a> <a href="/about" class="hover:text-emerald-700">About</a></div></div></header> <main class="min-h-[70vh]">${slots.default ? slots.default({}) : ``}</main> <footer class="border-t bg-gray-50"><div class="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col md:flex-row gap-2 md:items-center md:justify-between"><div>© ${escape((/* @__PURE__ */ new Date()).getFullYear())} PoshPOULE Farms</div> <div class="flex gap-4" data-svelte-h="svelte-1utzgaq"><a class="hover:text-emerald-700" href="/privacy">Privacy</a> <a class="hover:text-emerald-700" href="/terms">Terms</a> <a class="hover:text-emerald-700" href="mailto:support@poshpoule.com">Contact</a></div></div></footer>`;
});
export {
  Layout as default
};
