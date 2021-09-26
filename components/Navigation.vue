<template>
  <nav :class="['navigation', {jsScrolledWindowHeight: isScrolledWindowHeight}]">
    <div
      :class="`navigation__item navigation__item--${navigation.slug}`"
      v-for="navigation in navigations.contents"
      :key="navigation.id"
    >
      <nuxt-link
        :to="`/sidekick/${navigation.slug}/`"
        class="navigation__link"
      >
        <p class="navigation__caption">{{ navigation.caption }}</p>
        <img
          :src="`${navigation.photo.url}${mainvisualUrlParam}`"
          :alt="navigation.caption"
          :class="['navigation__image', {jsAnimation: isLoaded}]"
          @load="onLoad"
        >
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  async fetch() {
    this.navigations = await fetch(
      'https://mine.microcms.io/api/v1/navigation',
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
  },
  data() {
    return {
      navigations: [],
      mainvisualUrlParam: '',
      isLoaded: false
    }
  },
  props: {
    isScrolledWindowHeight: Boolean
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.mainvisualUrlParam = `?dpr=2&w=355`
    } else {
      this.mainvisualUrlParam = `?dpr=2&w=630`
    }
  },
  methods: {
    onLoad() {
      this.isLoaded = true
      this.$emit("onLoad")
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  height: 100vh;
  background-color: $color_darkGray;
  padding: 10px;
  display: grid;
  grid-template-rows: calc(33% - 10px) 34% calc(33% - 10px);
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9;
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
    @media (max-width: 768px) {
      filter: grayscale(0%) contrast(100%);
    }
  }
  &__caption {
    font-family: $fontFamily_english;
    font-size: 9vw;
    line-height: 1;
    position: absolute;
    right: 0%;
    bottom: 0%;
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
