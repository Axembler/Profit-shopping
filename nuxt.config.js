export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'profit-shopping',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/global.sass',
    '@assets/fonts.sass',
    '@assets/variables.sass'
  ],
  styleResources: {
    sass: [
      '@assets/variables.sass'
    ]
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  middleware: [
    'auth'
  ],
  
  axios: {
    proxy: true
  },
  
  proxy: {
    '/api': 'http://localhost:3000/api/'
  },

  serverMiddleware: [
    { path: "/api", handler: require("body-parser").json() },
    { path: '/api', handler: '~/api' }
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
