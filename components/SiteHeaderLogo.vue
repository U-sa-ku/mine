<template>
  <div :class="['siteHeaderlogo',{jsAnimation: isScrolledWindowHeight}]">
    <div class="siteHeaderlogo__logo">
      <nuxt-link to="/">
        <MineLogo :isLoaded="isScrolledWindowHeight"/>
      </nuxt-link>
    </div>
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
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 8;
  transition: 1s;
  @media (max-width: 767px) {
    height: 40px;
  }
  &.jsAnimation {
    background: rgba(0,0,0,0.5);
  }
  &__logo {
    width: 80px;
    position: absolute;
    left: 30px;
    top: 25px;
    @media (max-width: 767px) {
      width: 60px;
      left: 12px;
      top: 10px;
    }
  }
}
</style>
