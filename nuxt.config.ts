// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
});
