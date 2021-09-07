<template>
  <div :class="['loading', {jsHidden: isLoaded}]">
    <div class="loading__logo">
      <img src="@/assets/img/logo_mine_m.svg" alt="" class="loading__image loading__image--m">
      <img src="@/assets/img/logo_mine_i.svg" alt="" class="loading__image loading__image--i">
      <img src="@/assets/img/logo_mine_n.svg" alt="" class="loading__image loading__image--n">
      <img src="@/assets/img/logo_mine_e.svg" alt="" class="loading__image loading__image--e">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoaded: Boolean
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  background: $gradient_primary;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 11;
  &.jsHidden {
    animation: fadeOut 1s forwards;
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      z-index: -1;
    }
  }
  &__logo {
    width: 60px;
    height: 60px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &__image {
    height: 60px;
    position: absolute;
    left: 0px;
    top: 0px;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    &--m {
      animation-name: m;
    }
    @keyframes m {
      0%,
      20% {
        transform: translate(-50px, 50px) rotate(-45deg);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
    &--i {
      height: 74px;
      left: 24px;
      top: -14px;
      animation-name: i;
    }
    @keyframes i {
      0%,
      20% {
        transform: translate(-23px, 20px) rotate(-45deg);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
    &--n {
      animation-name: n;
    }
    @keyframes n {
      0%,
      20% {
        transform: translate(15px, -15px) rotate(-45deg);
      }
      100% {
        transform: translate(0px, 0px);
      }
    }
    &--e {
      transform: rotate(90deg);
      animation-name: e;
    }
    @keyframes e {
      0%,
      20% {
        transform: translate(65px, -65px) rotate(-45deg);
      }
      100% {
        transform: translate(0px, 0px) rotate(90deg);
      }
    }
  }
}
</style>
