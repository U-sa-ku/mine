<template>
  <div class="contentsWrapper">
    <objectsLoading :isLoaded="isLoaded"/>
    <objectsHamburgerMenu ref="HamburgerMenu"/>
    <LayoutsSiteHeader/>
    <Nuxt/>
    <LayoutsSiteFooter/>
  </div>
</template>

<script>
export default {
  name: 'default',
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
  },
  watch: {
    $route() {
      this.isLoaded = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>