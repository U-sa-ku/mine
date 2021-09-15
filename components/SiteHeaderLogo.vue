<template>
  <div :class="['siteHeaderlogo',{jsAnimation: isScrolledWindowHeight}, {jsAnimation: isLoaded}]">
    <div class="siteHeaderlogo__wrapper">
      <MineLogo
        class="siteHeaderlogo__logo"
        :isShowScroll="isScrolledWindowHeight"
        :isShowInit="isLoaded"
      />
      <MineText
        class="siteHeaderlogo__text"
        :isShowScroll="isScrolledWindowHeight"
        :isShowInit="isLoaded"
      />
    </div>
    <nuxt-link
      to="/"
      class="siteHeaderlogo__link"
    >
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
  props: {
    isLoaded: Boolean
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
  height: 70px;
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
  &__wrapper,
  &__link {
    display: flex;
    align-items: center;
    position: absolute;
    left: 26px;
    top: 15px;
    @media (max-width: 767px) {
      left: 8px;
      top: 7px;
    }
  }
  &__link {
    width: 125px;
    height: 40px;
    @media (max-width: 767px) {
      width: 90px;
      height: 28px;
    }
  }
  &__logo {
    width: 40px;
    margin-right: 4px;
    @media (max-width: 767px) {
      width: 28px;
      margin-right: 2px;
    }
  }
  &__text {
    width: 80px;
    @media (max-width: 767px) {
      width: 60px;
    }
  }
}
</style>
