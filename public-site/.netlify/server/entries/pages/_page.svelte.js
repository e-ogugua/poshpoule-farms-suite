import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<section class="max-w-5xl mx-auto p-6" data-svelte-h="svelte-jdsop"><h1 class="text-2xl font-semibold">Organic eggs, healthy birds, transparent farming.</h1> <p class="text-gray-600">Default currency: ₦</p> <div class="mt-6 grid md:grid-cols-3 gap-4"><div class="border rounded p-4"><h3 class="font-medium">Daily Production</h3> <p class="text-sm text-gray-600">Track eggs/day and feed usage.</p></div> <div class="border rounded p-4"><h3 class="font-medium">Partner Reports</h3> <p class="text-sm text-gray-600">PDF reports &amp; progress snapshots.</p></div> <div class="border rounded p-4"><h3 class="font-medium">Buyer Orders</h3> <p class="text-sm text-gray-600">Order eggs, birds, feed – pay in ₦.</p></div></div></section>`;
});
export {
  Page as default
};
