<template>
  <nav :class="['navigation', {jsScrolledWindowHeight: isScrolledWindowHeight}]">
    <div
      :class="`navigation__item navigation__item--2wheels`"
      @click="initShow"
    >
      <nuxt-link
        :to="`/sidekick/2wheels/`"
        class="navigation__link"
      >
        <p class="navigation__caption">2wheels</p>
        <img
          :src="`https://images.microcms-assets.io/assets/7d34d4e4f5c644a5bdf1dcb3cbe69450/2e3b7f0d11de4b75aea928c30265ffee/img_navigation_2wheels.jpg${mainvisualUrlParam}`"
          alt="2wheels"
          :class="['navigation__image', {jsAnimation: isLoaded}]"
          @load="onLoad"
        >
      </nuxt-link>
    </div>
    <div
      :class="`navigation__item navigation__item--mirrorless`"
      @click="initShow"
    >
      <nuxt-link
        :to="`/sidekick/mirrorless/`"
        class="navigation__link"
      >
        <p class="navigation__caption">mirrorless</p>
        <img
          :src="`https://images.microcms-assets.io/assets/7d34d4e4f5c644a5bdf1dcb3cbe69450/6f8c1337db264641adaf4f3215a8067c/img_navigation_mirrorless.jpg${mainvisualUrlParam}`"
          alt="mirrorless"
          :class="['navigation__image', {jsAnimation: isLoaded}]"
          @load="onLoad"
        >
      </nuxt-link>
    </div>
    <div
      :class="`navigation__item navigation__item--4wheels`"
      @click="initShow"
    >
      <nuxt-link
        :to="`/sidekick/4wheels/`"
        class="navigation__link"
      >
        <p class="navigation__caption">4wheels</p>
        <img
          :src="`https://images.microcms-assets.io/assets/7d34d4e4f5c644a5bdf1dcb3cbe69450/65edafdbec594acf9913defb76711138/img_navigation_4wheels.jpg${mainvisualUrlParam}`"
          alt="4wheels"
          :class="['navigation__image', {jsAnimation: isLoaded}]"
          @load="onLoad"
        >
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      mainvisualUrlParam: '',
      isLoaded: false
    }
  },
  props: {
    isScrolledWindowHeight: Boolean
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.mainvisualUrlParam = `?dpr=2&w=355&q=80`
    } else {
      this.mainvisualUrlParam = `?dpr=2&w=912&q=80`
    }
  },
  methods: {
    onLoad() {
      this.isLoaded = true
      this.$emit('onLoad')
    },
    initShow() {
      this.$emit('initShow')
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: $color_darkGray;
  padding: 10px;
  display: grid;
  grid-template-rows: calc(33% - 10px) 34% calc(33% - 10px);
  grid-template-columns: calc(50% - 5px) calc(50% - 5px);
  grid-gap: 10px;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 8;
  box-sizing: border-box;
  @media (max-width: 767px) {
    grid-template-rows: calc(40% - 10px) 20% calc(40% - 10px);
    grid-template-columns: 100%;
  }
  &__item {
    position: relative;
    &:nth-child(1) {
      grid-area: 1 / 1 / 4 / 2;
      @media (max-width: 767px) {
        grid-area: 1 / 1 / 2 / 2;
      }
    }
    &:nth-child(2) {
      grid-area: 1 / 2 / 2 / 3;
      @media (max-width: 767px) {
        grid-area: 2 / 1 / 3 / 2;
      }
    }
    &:nth-child(3) {
      grid-area: 2 / 2 / 4 / 3;
      @media (max-width: 767px) {
        grid-area: 3 / 1 / 4 / 2;
      }
    }
  }
  &__link {
    color: inherit;
    height: 100%;
    filter: grayscale(100%) contrast(120%);
    display: block;
    overflow: hidden;
    transition: 0.3s;
    @media (min-width: 769px) {
      &:hover {
        filter: grayscale(0%) contrast(1);
        .navigation__caption {
          opacity: 1;
        }
      }
    }
    @media (max-width: 767px) {
      filter: grayscale(0%) contrast(100%);
    }
  }
  &__caption {
    font-family: $fontFamily_english;
    font-size: 9vw;
    line-height: 1;
    position: absolute;
    right: -0.5vw;
    bottom: -0.9vw;
    z-index: 1;
    opacity: 1;
    mix-blend-mode: exclusion;
    transition: 0.3s;
    @media (max-width: 767px) {
      font-size: 17vw;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
