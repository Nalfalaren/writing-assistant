import getConfigObject from "./env/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/image'],
  devServer: {
    port: getConfigObject('DEV').PORT,
    host: 'localhost'
  },
});
