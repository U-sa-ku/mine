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
          :src="`https://images.microcms-assets.io/assets/7d34d4e4f5c644a5bdf1dcb3cbe69450/2e3b7f0d11de4b75aea928c30265ffee/img_navigation_2wheels.jpg?dpr=2&w=${imageWidth}&q=80`"
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
          :src="`https://images.microcms-assets.io/assets/7d34d4e4f5c644a5bdf1dcb3cbe69450/6f8c1337db264641adaf4f3215a8067c/img_navigation_mirrorless.jpg?dpr=2&w=${imageWidth}&q=80`"
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
          :src="`https://images.microcms-assets.io/assets/7d34d4e4f5c644a5bdf1dcb3cbe69450/65edafdbec594acf9913defb76711138/img_navigation_4wheels.jpg?dpr=2&w=${imageWidth}&q=80`"
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
        imageWidth: null,
        isLoaded: false
      }
    },
    props: {
      isScrolledWindowHeight: Boolean
    },
    mounted() {
      if(window.innerWidth <= 767) {
        this.imageWidth = 635
      } else {
        this.imageWidth = 698
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
    background-color: $color_middleGray;
    padding: 10px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 8;
    box-sizing: border-box;
    @media (max-width: 767px) {
      padding: 5px;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-columns: 100%;
      grid-gap: 5px;
    }
    &__item {
      position: relative;
      &:nth-child(1) {
        grid-area: 1 / 1 / 6 / 2;
        @media (max-width: 767px) {
          grid-area: 1 / 1 / 4 / 2;
        }
      }
      &:nth-child(2) {
        grid-area: 1 / 2 / 3 / 3;
        @media (max-width: 767px) {
          grid-area: 4 / 1 / 6 / 2;
        }
      }
      &:nth-child(3) {
        grid-area: 3 / 2 / 6 / 3;
        @media (max-width: 767px) {
          grid-area: 6 / 1 / 9 / 2;
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
      font-weight: 100;
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
