<template>
  <div class="contentsWrapper">
    <Loading :isLoaded="isLoaded"/>
    <HamburgerMenu :isLoaded="isLoaded"/>
    <div :class="['mainvisual', {jsScrolledWindowHeight: isScrolledWindowHeight}]">
      <h1 class="mainvisual__logo">
        <MineLogo :isLoaded="isLoaded"/>
        <MineText :isLoaded="isLoaded"/>
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
    <Navigation
      class="navigation--top"
      :isScrolledWindowHeight="isScrolledWindowHeight"
      @onLoad="onLoad"
    />
    <Photogragh/>
    <Notebook/>
    <SiteFooter/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: false,
      isScrolledWindowHeight: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onLoad() {
      this.isLoaded = true
    },
    onScroll() {
      const windowHeight = window.innerHeight
      let scrollTop = window.scrollY

      if(scrollTop >= windowHeight) {
        this.isScrolledWindowHeight = true
      } else {
        this.isScrolledWindowHeight = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mainvisual {
  width: 100vw;
  height: 100vh;
  margin-bottom: 100vh;
  position: relative;
  z-index: 1;
  &.jsScrolledWindowHeight {
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
      @media (max-width: 767px) {
        width: 70px;
      }
    }
  }
  &__scrollIcon {
    width: 1px;
    height: 10%;
    position: absolute;
    left: 50%;
    bottom: 10px;
    z-index: 1;
    transform: translateX(-50%);
    overflow: hidden;
    opacity: 0;
    transition: 1s 2s;
    &.jsAnimation {
      opacity: 1;
    }
  }
  &__scrollIconBorder {
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
  &__frame {
    background-color: #ffffff;
    position: absolute;
    z-index: 2;
    transform: scale(0);
    transition: 1s;
    &.jsAnimation {
      transform: scale(1);
    }
    $borderOffset: 10px;
    $borderWidth: 2px;
    $borderOffsetSp: 5px;
    $borderWidthSp: 2px;
    &--top {
      width: calc(100% - #{$borderOffset*2});
      height: $borderWidth;
      left: $borderOffset;
      top: $borderOffset;
      transform-origin: 0% 0%;
      @media (max-width: 767px) {
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
      @media (max-width: 767px) {
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
      @media (max-width: 767px) {
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
      @media (max-width: 767px) {
        width: $borderWidthSp;
        height: calc(100% - #{$borderOffsetSp*2});
        left: $borderOffsetSp;
        top: $borderOffsetSp;
      }
    }
  }
  &__background {
    width: 100vw;
    height: 100vh;
    background: $gradient_primary;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 0;
    opacity: 0.98;
  }
}
.navigation {
  &.jsScrolledWindowHeight {
    position: static;
  }
}
</style>
<style lang="scss">
.navigation--top {
  z-index: 0 !important;
  .navigation {
    &__item {
      font-size: 2px;
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
      transition: 1s 1s ease-out;
      &.jsAnimation {
        transform: translate(0%, 0%) !important;
      }
    }
  }
}
</style>