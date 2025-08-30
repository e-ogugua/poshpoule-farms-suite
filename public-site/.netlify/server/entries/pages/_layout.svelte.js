import { c as create_ssr_component } from "../../chunks/ssr.js";
import { e as escape } from "../../chunks/escape.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen flex flex-col"><header class="p-4 border-b bg-white" data-svelte-h="svelte-1vzvz0v"><div class="max-w-5xl mx-auto flex items-center justify-between"><a href="/" class="font-semibold">PoshPOULE Farms</a> <nav class="space-x-4 text-sm"><a href="/products">Products</a> <a href="https://poshpoule-dashboard.netlify.app" rel="noopener">Dashboard</a> <a href="https://poshpoule-partner.netlify.app" rel="noopener">Partners</a> <a href="https://poshpoule-buyer.netlify.app" rel="noopener">Buyer App</a></nav></div></header> <main class="flex-1">${slots.default ? slots.default({}) : ``}</main> <footer class="p-4 border-t text-xs text-center text-gray-500">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} PoshPOULE Farms Ltd</footer></div>`;
});
export {
  Layout as default
};
