<template>
  <main>
    <HamburgerMenu/>
    <div :class="['mainvisual', {jsScrolledWindowHeight: isScrolledWindowHeight}]">
      <h1 class="mainvisual__logo">
        <MineLogo :isLoaded="isLoaded"/>
      </h1>
      <i :class="[`mainvisual__scrollIcon`, {jsAnimation: isLoaded}]">
        <i class="mainvisual__scrollIconBorder"></i>
      </i>
      <figure class="mainvisual__border mainvisual__border--top"
        :class="{jsAnimation: isLoaded}"
      >
      </figure>
      <figure class="mainvisual__border mainvisual__border--right"
        :class="{jsAnimation: isLoaded}"
      >
      </figure>
      <figure class="mainvisual__border mainvisual__border--bottom"
        :class="{jsAnimation: isLoaded}"
      >
      </figure>
      <figure class="mainvisual__border mainvisual__border--left"
        :class="{jsAnimation: isLoaded}"
      >
      </figure>
    </div>
    <Navigation
      :isScrolledWindowHeight="isScrolledWindowHeight"
      @onLoad="onLoad"
    />
    <siteFooter/>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      isLoaded: false,
      isScrolledWindowHeight: false,
      loading: true
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
  background: $gradient_primary;
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
      width: 150px;
      @media (max-width: 767px) {
        width: 120px;
      }
    }
  }
  &__scrollIcon {
    width: 1px;
    height: 10%;
    position: absolute;
    left: 50%;
    bottom: 15px;
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
    content: "";
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: block;
    animation: 2s scrollIcon infinite;
  }
  @keyframes scrollIcon {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  &__border {
    background-color: #ffffff;
    position: absolute;
    z-index: 2;
    transform: scale(0);
    transition: 1s;
    &.jsAnimation {
      transform: scale(1);
    }
    $borderOffset: 10px;
    &--top {
      width: calc(100% - #{$borderOffset*2});
      height: 4px;
      left: $borderOffset;
      top: $borderOffset;
      transform-origin: 0% 0%;
    }
    &--right {
      width: 4px;
      height: calc(100% - #{$borderOffset*2});
      right: $borderOffset;
      top: $borderOffset;
      transform-origin: 100% 0%;
    }
    &--bottom {
      width: calc(100% - #{$borderOffset*2});
      height: 4px;
      left: $borderOffset;
      bottom: $borderOffset;
      transform-origin: 100% 100%;
    }
    &--left {
      width: 4px;
      height: calc(100% - #{$borderOffset*2});
      left: $borderOffset;
      top: $borderOffset;
      transform-origin: 0% 100%;
    }
  }
}
.navigation {
  &.jsScrolledWindowHeight {
    position: static;
  }
}
</style>