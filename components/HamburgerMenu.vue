<template>
  <div class="humburgerMenu">
    <div
      :class="['humburgerMenu__button', {jsClose: isShow}]"
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
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed !important;
  z-index: 9 !important;
}

.humburgerMenu {
  &__button {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    position: fixed;
    right: 30px;
    top: 30px;
    z-index: 10;
    cursor: pointer;
    &:before,
    &:after {
      content: "";
      width: 40px;
      height: 2px;
      background-color: #ffffff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: 0.3s;
    }
    &:before {
      top: 12px;
    }
    &:after {
      bottom: 12px;
    }
    &.jsClose {
      &:before {
        transform: translate(-50%, 7px) rotate(45deg);
      }
      &:after {
        transform: translate(-50%, -7px) rotate(-45deg);
      }
    }
  }
}
</style>
