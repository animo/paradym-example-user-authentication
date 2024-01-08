export default defineNuxtConfig({
  modules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: true,
          Lato: [400, 500, 600, 700],
        },
      },
    ],
    '@nuxt/ui',
  ],
  runtimeConfig: {
    // FIXME: Add your Paradym API key here: https://docs.paradym.id/executing-a-workflow/api-execution#api-key
    PARADYM_API_KEY: 'paradym_c7939f5093a02d7c8d7ba66e78bbb4d643a7ccf3eb57132138fc5a4c6074109e',
    public: {
      PARADYM_URL: 'https://api.paradym.id/v1',
      // FIXME: Add the respective workflow ID's below
      LOGIN_WORKFLOW_ID: 'clqxighcq004ds601n37rhcyo',
      SIGN_UP_WORKFLOW_ID: 'clqxhx5ww003rs601858nl0bl',
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
