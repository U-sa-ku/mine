<template>
  <div class="contentsWrapper">
    <ElementsReloadButton/>
    <ElementsHamburgerMenu/>
    <LayoutsSiteHeader :isInitShow="isInitShow"/>
    <Nuxt/>
    <LayoutsSiteFooter/>
  </div>
</template>

<script>
  export default {
    name: 'no-page-loader',
    data() {
      return {
        isInitShow: false,
      }
    },
    created() {
      this.setListener()
    },
    methods: {
      setListener() {
        this.$nuxt.$on('initShowSiteHeader', this.initShowSiteHeader)
      },
      initShowSiteHeader() {
        this.isInitShow = true
      }
    },
    watch: {
      $route() {
        this.isInitShow = false
      }
    }
  }
</script>
