import axios from 'axios'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mine',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '車とバイクとカメラ' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'mine' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://mine-u-saku.netlify.app/' },
      { hid: 'og:title', property: 'og:title', content: 'mine' },
      { hid: 'og:description', property: 'og:description', content: '車とバイクとカメラ' },
      { hid: 'og:image', property: 'og:image', content: 'https://mine-u-saku.netlify.app/ogp.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'format-detection', content: 'telephone=no' }


    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Barlow:wght@200&display=swap&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/reset.scss',
    '@/assets/scss/global.scss'
  ],

  styleResources: {
    scss: [
      '@/assets/scss/variable.scss',
      '@/assets/scss/mixin.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/swiper', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/moment',
    'nuxt-lazysizes'
  ],

  lazySizes: {
    extendAssetUrls: {
      img: ['src', 'srcset', 'data-src', 'data-srcset'],
      source: ['src', 'srcset', 'data-src', 'data-srcset'],

      // Example for a custom component
      AppImage: ['source-md-url', 'image-url'],
    }
  },

  moment: {
    locales: ['ja']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/pwa'
  ],

  /*
   ** @nuxtjs/pwa Configuration
   ** https://github.com/nuxt-community/pwa-module
   */
  manifest: {
    name: 'mine',
    lang: 'ja',
    short_name: 'mine',
    title: 'mine',
    'og:title': 'mine',
    description: 'mine',
    'og:description': 'mine',
    theme_color: '#252525',
    background_color: '#252525'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: [
      'vue-awesome-swiper'
    ]
  },

  generate: {
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // photograph一覧のページング
      const photograghLimit = 20
      const photograph = await axios
        .get(`https://mine.microcms.io/api/v1/photograph?limit=0`, {
          headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / photograghLimit)).map((p) => ({
            route: `/photograph/page/${p}/`,
          }))
        )

      snapshot一覧のページング
      const snapshotLimit = 20
      const snapshot = await axios
        .get(`https://mine.microcms.io/api/v1/snapshot?limit=0`, {
          headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / snapshotLimit)).map((p) => ({
            route: `/snapshot/page/${p}/`,
          }))
        )

      return photograph
    },
  },

  router: {
    trailingSlash: true,
    middleware: "redirect",
    linkActiveClass: '--active',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          path: '/photograph/page/:p/',
          component: resolve(__dirname,'pages/photograph/index.vue'),
          name: 'photograph',
        },
        {
          path: '/snapshot/page/:p/',
          component: resolve(__dirname,'pages/snapshot/index.vue'),
          name: 'snapshot',
        }
      )
    }
  }
}
