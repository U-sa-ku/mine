<template>
  <div
    class="reloadButton"
    @click="reload"
  >
    <img src="@/assets/img/icon_reload.svg" alt="reload" class="reloadButton__icon">
  </div>
</template>

<script>
export default {
  methods: {
    reload() {
      location.reload();
    }
  }
}
</script>

<style lang="scss" scoped>
.reloadButton {
  position: fixed;
  right: 100px;
  top: 12px;
  z-index: 10;
  cursor: pointer;
  @media (max-width: 999px) {
    right: 60px;
    top: 5px;
  }
  @media (min-width: 769px) {
    transition: 0.3s;
    &:hover {
      transform: rotate(180deg);
    }
  }
  &__icon {
    width: 40px;
    height: 40px;
    @media (max-width: 999px) {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
