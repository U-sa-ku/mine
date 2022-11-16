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
  right: 20px;
  bottom: 20px;
  z-index: 10;
  cursor: pointer;
  @media (max-width: 999px) {
    right: 10px;
    bottom: 10px;
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
