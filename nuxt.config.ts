// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui'],
    runtimeConfig: {
        public: {
            SERVERLESS_DOMAIN: process.env.SERVERLESS_DOMAIN
        }
    }
})
