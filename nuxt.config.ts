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
    PARADYM_API_KEY: process.env.PARADYM_API_KEY,
    public: {
      PARADYM_URL: 'https://api.paradym.id/v1',
      LOGIN_WORKFLOW_ID: process.env.LOGIN_WORKFLOW_ID,
      SIGN_UP_WORKFLOW_ID: process.env.SIGN_UP_WORKFLOW_ID,
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
