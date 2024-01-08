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
    // TODO: Add your Paradym API key here: https://docs.paradym.id/executing-a-workflow/api-execution#api-key
    PARADYM_API_KEY: '',
    public: {
      PARADYM_URL: 'https://api.paradym.id/v1',
      // TODO: Add the respective workflow ID's below
      LOGIN_WORKFLOW_ID: '',
      SIGN_UP_WORKFLOW_ID: '',
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
