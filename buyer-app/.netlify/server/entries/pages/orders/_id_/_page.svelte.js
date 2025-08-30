import { c as create_ssr_component } from "../../../../chunks/ssr.js";
import { e as escape } from "../../../../chunks/escape.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { params } = $$props;
  if ($$props.params === void 0 && $$bindings.params && params !== void 0) $$bindings.params(params);
  return `<section class="max-w-xl mx-auto p-4 space-y-4"><h1 class="text-xl font-semibold">Order #${escape(params.id)}</h1> ${``} <form class="border rounded p-3 space-y-2"><label class="block text-sm" for="payment-proof-input" data-svelte-h="svelte-1e7e4ge">Upload payment proof (image or PDF)</label> <input id="payment-proof-input" type="file" accept="image/*,application/pdf" class="block"> <button class="px-3 py-1.5 bg-emerald-600 text-white rounded" data-svelte-h="svelte-ou5yoq">Submit Proof</button> ${``}</form></section>`;
});
export {
  Page as default
};
