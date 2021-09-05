<template>
  <div class="siteHeaderlogo">
    <nuxt-link to="/">
      <MineLogo :isLoaded="isScrolledWindowHeight"/>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScrolledWindowHeight: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const windowHeight = window.innerHeight
      let scrollTop = window.scrollY

      if(scrollTop >= windowHeight / 3) {
        this.isScrolledWindowHeight = true
      } else {
        this.isScrolledWindowHeight = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.siteHeaderlogo {
  width: 80px;
  position: fixed;
  left: 30px;
  top: 25px;
  z-index: 8;
  @media (max-width: 767px) {
    width: 60px;
    left: 12px;
    top: 10px;
  }
}
</style>
