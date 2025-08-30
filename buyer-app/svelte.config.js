import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // Use supported runtime option instead of deprecated `edge`/`split` flags
      runtime: 'nodejs20.x'
    }),
    paths: {
      base: process.env.BASE_PATH || ''
    }
  }
};

export default config;
