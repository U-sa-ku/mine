<template>
  <div class="contentsWrapper">
    <objectsLoading :isLoaded="isLoaded"/>
    <objectsReloadButton/>
    <objectsHamburgerMenu/>
    <LayoutsSiteHeader :isInitShow="isInitShow"/>
    <Nuxt/>
    <LayoutsSiteFooter/>
  </div>
</template>

<script>
  export default {
    name: 'default',
    data() {
      return {
        isLoaded: false,
        isInitShow: false,
      }
    },
    created() {
      this.setListener()
    },
    methods: {
      setListener() {
        this.$nuxt.$on('onLoad', this.onLoad)
        this.$nuxt.$on('initShowSiteHeader', this.initShowSiteHeader)
      },
      onLoad(isLoaded) {
        this.isLoaded = isLoaded
      },
      initShowSiteHeader() {
        this.isInitShow = true
      }
    },
    watch: {
      $route() {
        this.isLoaded = false
        this.isInitShow = false
      }
    }
  }
</script>
