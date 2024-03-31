<template>
  <main class="mainContents">
    <div :class="['mainvisual', {jsScrolledWindowHeight: isScrolledWindowHeight}]">
      <h1 class="mainvisual__logo">
        <ElementsMineLogo :isInitShow="isLoadedLogo"/>
        <ElementsMineText :isInitShow="isLoadedLogo"/>
      </h1>
      <i :class="[`mainvisual__scrollIcon`, {jsAnimation: isLoaded}]">
        <i class="mainvisual__scrollIconBorder"></i>
      </i>
      <figure :class="['mainvisual__frame','mainvisual__frame--top',{jsAnimation: isLoaded}]"></figure>
      <figure :class="['mainvisual__frame','mainvisual__frame--right',{jsAnimation: isLoaded}]"></figure>
      <figure :class="['mainvisual__frame','mainvisual__frame--bottom',{jsAnimation: isLoaded}]"></figure>
      <figure :class="['mainvisual__frame','mainvisual__frame--left',{jsAnimation: isLoaded}]"></figure>
      <div class="mainvisual__background"></div>
    </div>
    <BlocksNavigation
      class="navigation--top"
      :isScrolledWindowHeight="isScrolledWindowHeight"
      @onLoad="onLoad"
      />
    <sectionsPhotoSlider
      sectionName="photograph"
      :photos="photographs"
      />
    <sectionsPhotoSlider
      sectionName="snapshot"
      :photos="snapshots"
      />
  </main>
</template>

<script>
  export default {
    layout: 'no-site-header',
    async fetch() {
      this.photographs = await fetch(
        `https://mine.microcms.io/api/v1/photo?limit=10&filters=category[contains]photograph`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      ).then(res => res.json())

      this.snapshots = await fetch(
        `https://mine.microcms.io/api/v1/photo?limit=10&filters=category[contains]snapshot`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      ).then(res => res.json())
    },
    data() {
      return {
        photographs: [],
        snapshots: [],
        isLoaded: false,
        isLoadedLogo : false,
        isScrolledWindowHeight: false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll)
    },
    methods: {
      onLoad() {
        this.isLoaded = true
        this.$nuxt.$emit('onLoad', this.isLoaded)

        const onLoadLogo = () => {
          this.isLoadedLogo = true
        }
        setTimeout(onLoadLogo, 1500)
      },
      onScroll() {
        const windowHeight = window.innerHeight
        const triggerPosition = windowHeight * 2
        let scrollTop = window.scrollY

        if(scrollTop >= triggerPosition) {
          this.isScrolledWindowHeight = true
        } else {
          this.isScrolledWindowHeight = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $mainvisualAnimationStartDelay: 0.5s;
  .mainvisual {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    margin-bottom: 200vh;
    position: relative;
    z-index: 1;
    &:before {
      content: "";
      width: 100%;
      height: 100vh;
      height: 100dvh;
      background: $gradient_primary;
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 0;
      opacity: 0.98;
    }
    &.jsScrolledWindowHeight {
      margin-top: 100vh;
      margin-bottom: 0vh;
    }
    &__logo {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      svg {
        width: 100px;
        margin-bottom: 5px;
        display: block;
        &:last-child {
          margin-bottom: 0px;
        }
        @media (max-width: 768px) {
          width: 70px;
        }
      }
    }
    &__scrollIcon {
      width: 1px;
      height: 10%;
      position: absolute;
      left: 50%;
      bottom: 6px;
      z-index: 1;
      transform: translateX(-50%);
      overflow: hidden;
      opacity: 0;
      transition: 1s $mainvisualAnimationStartDelay + 0.5s;
      @media (max-width: 768px) {
        bottom: 5px;
      }
      &:before {
        content: "";
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: block;
        animation: 2s scrollIconBorder infinite;
      }
      @keyframes scrollIconBorder {
        0% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(100%);
        }
      }
      &.jsAnimation {
        opacity: 1;
      }
    }
    &__frame {
      background-color: #ffffff;
      position: absolute;
      z-index: 2;
      transform: scale(0);
      transition: 1s $mainvisualAnimationStartDelay;
      &.jsAnimation {
        transform: scale(1);
      }
      $borderOffset: 6px;
      $borderWidth: 1px;
      $borderOffsetSp: 4px;
      $borderWidthSp: 1px;
      &--top {
        width: calc(100% - #{$borderOffset*2});
        height: $borderWidth;
        left: $borderOffset;
        top: $borderOffset;
        transform-origin: 0% 0%;
        @media (max-width: 768px) {
          width: calc(100% - #{$borderOffsetSp*2});
          height: $borderWidthSp;
          left: $borderOffsetSp;
          top: $borderOffsetSp;
        }
      }
      &--right {
        width: $borderWidth;
        height: calc(100% - #{$borderOffset*2});
        right: $borderOffset;
        top: $borderOffset;
        transform-origin: 100% 0%;
        @media (max-width: 768px) {
          width: $borderWidthSp;
          height: calc(100% - #{$borderOffsetSp*2});
          right: $borderOffsetSp;
          top: $borderOffsetSp;
        }
      }
      &--bottom {
        width: calc(100% - #{$borderOffset*2});
        height: $borderWidth;
        left: $borderOffset;
        bottom: $borderOffset;
        transform-origin: 100% 100%;
        @media (max-width: 768px) {
          width: calc(100% - #{$borderOffsetSp*2});
          height: $borderWidthSp;
          left: $borderOffsetSp;
          bottom: $borderOffsetSp;
        }
      }
      &--left {
        width: $borderWidth;
        height: calc(100% - #{$borderOffset*2});
        left: $borderOffset;
        top: $borderOffset;
        transform-origin: 0% 100%;
        @media (max-width: 768px) {
          width: $borderWidthSp;
          height: calc(100% - #{$borderOffsetSp*2});
          left: $borderOffsetSp;
          top: $borderOffsetSp;
        }
      }
    }
  }
</style>
<style lang="scss">
  $mainvisualAnimationStartDelay: 0.5s;
  .navigation--top {
     z-index: 0 !important;
    &.jsScrolledWindowHeight {
      position: static !important;
    }
    .navigation {
      &__item {
        &:nth-child(1) .navigation__image {
          transform: translateY(-100%);
        }
        &:nth-child(2) .navigation__image {
          transform: translateX(-100%);
        }
        &:nth-child(3) .navigation__image {
          transform: translateY(100%);
        }
      }
      &__image {
        transition: 1s $mainvisualAnimationStartDelay ease-out;
        &.jsAnimation {
          transform: translate(0%, 0%) !important;
        }
      }
    }
  }
</style>