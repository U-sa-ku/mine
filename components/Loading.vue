<template>
  <div
    class="loading"
    v-if="loading"
  >
    <div class="loading__logo">
      <MineLogo/>
    </div>
    <figure class="loading__frame loading__frame--top"></figure>
    <figure class="loading__frame loading__frame--right"></figure>
    <figure class="loading__frame loading__frame--bottom"></figure>
    <figure class="loading__frame loading__frame--left"></figure>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100vw;
  height: 100vh;
  background: #ff0000;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 11;
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
    $borderWidth: 4px;
    &--top {
      width: calc(100% - #{$borderOffset*2});
      height: $borderWidth;
      left: $borderOffset;
      top: $borderOffset;
      transform-origin: 0% 0%;
    }
    &--right {
      width: $borderWidth;
      height: calc(100% - #{$borderOffset*2});
      right: $borderOffset;
      top: $borderOffset;
      transform-origin: 100% 0%;
    }
    &--bottom {
      width: calc(100% - #{$borderOffset*2});
      height: $borderWidth;
      left: $borderOffset;
      bottom: $borderOffset;
      transform-origin: 100% 100%;
    }
    &--left {
      width: $borderWidth;
      height: calc(100% - #{$borderOffset*2});
      left: $borderOffset;
      top: $borderOffset;
      transform-origin: 0% 100%;
    }
  }
}
</style>
