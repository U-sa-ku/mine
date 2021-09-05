<template>
  <div class="humburgerMenu">
    <div
      :class="['humburgerMenu__button', {jsClose: isShow}, {jsAnimation: isLoaded}]"
      @click="isShow = !isShow"
    >
    </div>
    <transition name="jsFade">
      <Navigation
        v-if="isShow"
        :isShow="isShow"
      />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  props: {
    isLoaded: Boolean
  }
}
</script>

<style lang="scss" scoped>
.humburgerMenu {
  &__button {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    position: fixed;
    right: 30px;
    top: 18px;
    z-index: 10;
    cursor: pointer;
    opacity: 0;
    transition: 1s 1s;
    &.jsAnimation {
      opacity: 1;
    }
    @media (max-width: 767px) {
      width: 24px;
      height: 26px;
      right: 10px;
      top: 5px;
    }
    &:before,
    &:after {
      content: "";
      width: 100%;
      height: 2px;
      background-color: #ffffff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: 0.3s;
    }
    &:before {
      top: 12px;
      @media (max-width: 767px) {
        top: 9px;
      }
    }
    &:after {
      bottom: 12px;
      @media (max-width: 767px) {
        bottom: 9px;
      }
    }
    &.jsClose {
      &:before {
        transform: translate(-50%, 7px) rotate(45deg);
        @media (max-width: 767px) {
          top: 5px;
        }
      }
      &:after {
        transform: translate(-50%, -7px) rotate(-45deg);
        @media (max-width: 767px) {
          bottom: 5px;
        }
      }
    }
  }
}
</style>
