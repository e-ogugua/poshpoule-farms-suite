import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.CU_PgIcy.js",app:"_app/immutable/entry/app.DCZYdEFT.js",imports:["_app/immutable/entry/start.CU_PgIcy.js","_app/immutable/chunks/7e80cMl9.js","_app/immutable/chunks/iVdC-PA6.js","_app/immutable/entry/app.DCZYdEFT.js","_app/immutable/chunks/iVdC-PA6.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/notifications/send",
				pattern: /^\/api\/notifications\/send\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/notifications/send/_server.ts.js'))
			},
			{
				id: "/api/orders",
				pattern: /^\/api\/orders\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/orders/_server.ts.js'))
			},
			{
				id: "/api/orders/[id]",
				pattern: /^\/api\/orders\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/orders/_id_/_server.ts.js'))
			},
			{
				id: "/api/orders/[id]/payment-proof",
				pattern: /^\/api\/orders\/([^/]+?)\/payment-proof\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/orders/_id_/payment-proof/_server.ts.js'))
			},
			{
				id: "/api/products",
				pattern: /^\/api\/products\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/products/_server.ts.js'))
			},
			{
				id: "/api/products/[id]",
				pattern: /^\/api\/products\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/products/_id_/_server.ts.js'))
			},
			{
				id: "/orders/[id]",
				pattern: /^\/orders\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
