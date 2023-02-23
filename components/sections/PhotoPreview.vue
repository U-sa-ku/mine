<template>
  <div class="photoPreview">
    <div class="photoPreview__imageWrapper">
      <img
        :src="`${photo.url}?dpr=2&w=${imageWidth}`"
        alt=""
        :class="['photoPreview__image', {jsAnimation: isLoaded}]"
        @load="onLoad"
        >
    </div>
    <nav class="photoPreviewNavigation">
      <div class="photoPreviewNavigation__inner">
        <nuxt-link
         :to="`/${sectionName}/${prevPhotoId}/?list=${listNumber}`"
         v-if="isShowPrevPhoto"
         class="photoPreviewNavigation__link photoPreviewNavigation__link--prev"
         >
          <span class="photoPreviewNavigation__caption">prev</span>
        </nuxt-link>
        <nuxt-link
          :to="`/${sectionName}/page/${listNumber}/`"
          class="photoPreviewNavigation__link photoPreviewNavigation__link--list"
          >
          <span class="photoPreviewNavigation__listIcon">
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
          </span>
        </nuxt-link>
        <nuxt-link
          :to="`/${sectionName}/${nextPhotoId}/?list=${listNumber}`"
          v-if="isShowNextPhoto"
          class="photoPreviewNavigation__link photoPreviewNavigation__link--next"
          >
          <span class="photoPreviewNavigation__caption">next</span>
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isLoaded: false,
        imageWidth: null,
      }
    },
    props: {
      sectionName: undefined,
      photo: null,
      prevPhotoId: null,
      isShowPrevPhoto: false,
      nextPhotoId: null,
      isShowNextPhoto: false,
      listNumber: null
    },
    mounted() {
      if(window.innerWidth <= 767) {
        this.imageWidth = 645
      } else {
        this.imageWidth = 1440
      }
    },
    methods: {
      onLoad() {
        this.isLoaded = true
        this.$nuxt.$emit('onLoad', this.isLoaded)
        this.$nuxt.$emit('initShowSiteHeader')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photoPreview {
    &__imageWrapper {
      background-color: #000000;
      margin-bottom: 15px;
      position: relative;
      @media (min-width: 768px) {
        height: calc(100vh - 145px);
        margin-top: 70px;
      }
      @media (max-width: 999px) {
        height: calc(100vh - 93px);
        height: calc(100dvh - 93px);
        margin-top: 40px;
        margin-bottom: 10px;
      }
    }
    &__image {
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: 1s;
      &.jsAnimation {
        opacity: 1;
      }
    }
  }
  .photoPreviewNavigation {
    max-width: 1280px;
    margin: 0px auto;
    padding: 0px 30px;
    @media (max-width: 767px) {
      padding: 0px 15px;
    }
    &__inner {
      width: 24px;
      margin: 0px auto;
      position: relative;
      @media (min-width: 768px) {
        padding-top: 60px;
      }
    }
    &__link {
      color: inherit;
      font-size: 1.8rem;
      text-decoration: none;
      letter-spacing: 0.1em;
      display: block;
      position: absolute;
      z-index: 1;
      &--prev,
      &--next {
        width: 110px;
        top: 0px;
        @media (max-width: 999px) {
          width: 90px;
          font-size: 1.4rem;
        }
        &:before {
          content: "";
          width: 100%;
          height: 15px;
          border-style: solid;
          border-color: $color_lightGray;
          display: block;
          position: absolute;
          bottom: -5px;
          z-index: 0;
          transition: 0.3s;
        }
        @media (min-width: 769px) {
          &:hover:before {
            transform: translateX(10px) skewX(45deg);
          }
        }
      }
      &--prev {
        padding-left: 30px;
        right: 70px;
        @media (max-width: 999px) {
          right: 45px;
        }
        &:before {
          border-width: 0px 0px 1px 1.5px;
          left: 0px;
          transform-origin: 0% 100%;
          transform: skewX(-45deg);
        }
        @media (min-width: 769px) {
          &:hover:before {
            transform: translateX(-10px) skewX(-45deg) !important;
          }
        }
      }
      &--next {
        text-align: right;
        padding-right: 30px;
        left: 70px;
        @media (max-width: 999px) {
          left: 45px;
        }
        &:before {
          border-width: 0px 1.5px 1px 0px;
          transform-origin: 1000% 100%;
          transform: skewX(45deg);
          right: 0px;
        }
      }
      &--list {
        position: absolute;
        left: 50%;
        top: 5px;
        z-index: 1;
        transform: translateX(-50%);
      }
    }
    &__caption {
      font-family: $fontFamily_english;
    }
    &__listIcon {
      width: 30px;
      height: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 5px;
      @media (max-width: 999px) {
        width: 24px;
        height: 24px;
        gap: 4px;
      }
      @media (min-width: 769px) {
        transition: 0.3s;
        &:hover {
          gap: 3px;
        }
      }
    }
    &__listIconSquare {
      background-color: $color_lightGray;
    }
  }
</style>
