

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/orders/_id_/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.DxNNHqzz.js","_app/immutable/chunks/iVdC-PA6.js","_app/immutable/chunks/IHki7fMi.js"];
export const stylesheets = [];
export const fonts = [];
