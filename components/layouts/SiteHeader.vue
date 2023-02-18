<template>
  <header :class="['siteHeader', {jsAnimation: isScrolledWindowHeight}, {jsAnimation: isInitShow}]">
    <div class="siteHeader__logoWrapper">
      <ElementsMineLogo
        class="siteHeader__logo siteHeader__logo--siteHeader"
        :isShowScroll="isScrolledWindowHeight"
        :isInitShow="isInitShow"
        />
      <ElementsMineText
        class="siteHeader__text siteHeader__text--siteHeader"
        :isShowScroll="isScrolledWindowHeight"
        :isInitShow="isInitShow"
        />
    </div>
    <nuxt-link
      to="/"
      class="siteHeader__link"
      >
    </nuxt-link>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        isScrolledWindowHeight: false
      }
    },
    props: {
      isLoaded: Boolean,
      isInitShow: Boolean
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },
    methods: {
      onScroll() {
        const windowHeight = window.innerHeight
        let scrollTop = window.scrollY

        if(scrollTop >= windowHeight / 2) {
          this.isScrolledWindowHeight = true
        } else {
          this.isScrolledWindowHeight = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .siteHeader {
    width: 100%;
    height: 70px;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 6;
    opacity: 0;
    transition: 1s;
    @media (max-width: 999px) {
      height: 40px;
    }
    &.jsAnimation {
      opacity: 1;
      .siteHeader__link {
        z-index: 1;
      }
    }
    &__logoWrapper,
    &__link {
      display: flex;
      align-items: center;
      position: absolute;
      left: 26px;
      top: 15px;
      @media (max-width: 999px) {
        left: 8px;
        top: 7px;
      }
    }
    &__logo {
      width: 40px;
      margin-right: 4px;
      @media (max-width: 999px) {
        width: 28px;
        margin-right: 2px;
      }
    }
    &__text {
      width: 80px;
      @media (max-width: 999px) {
        width: 60px;
      }
    }
    &__link {
      width: 125px;
      height: 40px;
      z-index: -1;
      @media (max-width: 999px) {
        width: 90px;
        height: 28px;
      }
    }
  }
</style>
