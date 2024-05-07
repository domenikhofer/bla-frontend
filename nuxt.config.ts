// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'BLA - BetterListApp',
    }
  },
  experimental: {
    viewTransition: true
  },
  css: [
    '@/assets/style.css',
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      appEnv: process.env.APP_ENV,
    }
  },
  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        Quicksand: true
      }
    }],
    [
      '@pinia/nuxt',
      {
          autoImports: [
              'defineStore',
          ],
      },
  ],

  ]

})


