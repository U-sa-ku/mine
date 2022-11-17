<template>
  <div class="contentsWrapper">
    <objectsLoading :isLoaded="isLoaded"/>
    <objectsHamburgerMenu/>
    <Nuxt/>
    <LayoutsSiteFooter/>
  </div>
</template>

<script>
export default {
  name: 'no-site-header',
  async asyncData({ params }) {
    const workbox = await window.$workbox;

    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          alert('update')
        }
      });
    }
  },
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