<template>
  <div class="contentsWrapper">
    <ElementsPageLoader :isLoaded="isLoaded"/>
    <ElementsReloadButton/>
    <ElementsHamburgerMenu/>
    <Nuxt/>
    <LayoutsSiteFooter/>
  </div>
</template>

<script>
export default {
  name: 'no-site-header',
  data() {
    return {
      isLoaded: false
    }
  },
  created() {
    this.setListener()
  },
  methods: {
    setListener() {
      this.$nuxt.$on('onLoad', this.onLoad)
    },
    onLoad(isLoaded) {
      this.isLoaded = isLoaded
    }
  }
}
</script>

<style lang="scss" scoped>
</style>