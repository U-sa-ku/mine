<template>
  <div class="humburgerMenu">
    <div
      :class="['humburgerMenu__button', {jsClose: isShow}]"
      @click="isShow = !isShow"
    >
    </div>
    <objectsNavigation
      :class="{jsShow: isShow}"
      @initShow="initShow"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    initShow() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.humburgerMenu {
  &__button {
    width: 40px;
    height: 36px;
    border-radius: 100%;
    position: fixed;
    right: 26px;
    top: 14px;
    z-index: 10;
    cursor: pointer;
    @media (max-width: 999px) {
      width: 24px;
      height: 26px;
      right: 12px;
      top: 7px;
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
      @media (max-width: 999px) {
        top: 9px;
      }
    }
    &:after {
      bottom: 12px;
      @media (max-width: 999px) {
        bottom: 9px;
      }
    }
    &.jsClose {
      &:before {
        top: 10px;
        transform: translate(-50%, 7px) rotate(45deg);
        @media (max-width: 999px) {
          top: 5px;
        }
      }
      &:after {
        bottom: 10px;
        transform: translate(-50%, -7px) rotate(-45deg);
        @media (max-width: 999px) {
          bottom: 5px;
        }
      }
    }
  }
}
.navigation {
  transform: translateX(100%);
  transition: 0.5s;
  &.jsShow {
    transform: translateX(0%);
  }
}
</style>
