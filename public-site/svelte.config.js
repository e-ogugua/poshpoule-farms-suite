import adapter from '@sveltejs/adapter-netlify';

const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: '../shared-components/src',
    }
  }
};

export default config;
