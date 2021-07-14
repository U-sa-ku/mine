<template>
  <nav :class="['navigation', {jsScrolledWindowHeight: isScrolledWindowHeight}]">
    <div
      :class="`navigation__item navigation__item--${content.slug}`"
      v-for="content in datas.contents"
      :key="content.id"
    >
      <nuxt-link :to="`/page/${content.slug}/`" class="navigation__link">
        <p class="navigation__caption">{{ content.caption }}</p>
        <img
          :src="content.photo.url"
          alt=""
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
      datas: [],
      isLoaded: false
    }
  },
  props: {
    isScrolledWindowHeight: Boolean
  },
  async fetch() {
    this.datas = await fetch(
      'https://mine.microcms.io/api/v1/navigation',
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
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
  width: 100vw;
  height: 100vh;
  height: -webkit-fill-available;
  background-color: $color_darkGray;
  padding: 10px;
  display: grid;
  grid-template-rows: calc(33% - 10px) 10px calc(34% - 10px) 10px 33%;
  grid-template-columns: calc(50% - 5px) 10px calc(50% - 5px);
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 0;
  box-sizing: border-box;
  @media (max-width: 767px) {
    padding: 5px 10px;
    grid-template-rows: 40% 20% 40%;
    grid-template-columns: 100%;
  }
  &__item {
    position: relative;
    @media (max-width: 767px) {
      margin: 5px 0px;
    }
    &:nth-child(1) {
      grid-area: 1 / 1 / 6 / 2;
      @media (max-width: 767px) {
        grid-area: 1 / 1 / 2 / 2;
      }
      .navigation__image {
        transform: translateY(-100%);
      }
    }
    &:nth-child(2) {
      grid-area: 1 / 3 / 2 / 4;
      @media (max-width: 767px) {
        grid-area: 2 / 1 / 3 / 2;
      }
      .navigation__image {
        transform: translateX(-100%);
      }
    }
    &:nth-child(3) {
      grid-area: 3 / 3 / 6 / 3;
      @media (max-width: 767px) {
        grid-area: 3 / 1 / 4 / 2;
      }
      .navigation__image {
        transform: translateY(100%);
      }
    }
  }
  &__link {
    height: 100%;
    filter: grayscale(100%);
    display: block;
    overflow: hidden;
    transition: 0.3s;
    @media (min-width: 768px) {
      &:hover {
        filter: grayscale(0%);
        .navigation__caption {
          opacity: 1;
        }
      }
    }
    @media (max-width: 767px) {
      filter: grayscale(0%);
    }
  }
  &__caption {
    color: $color_lightGray;
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
    transition: 1s 1s ease-out;
    &.jsAnimation {
      transform: translate(0%, 0%) !important;
    }
  }
}
</style>
