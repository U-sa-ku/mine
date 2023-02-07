<template>
  <div
    class="reloadButton"
    @click="reload"
    v-if="isPwa == true"
  >
    <img src="@/assets/img/icon_reload.svg" alt="reload" class="reloadButton__icon">
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPwa: false
    }
  },
  mounted() {
    const url = new URL(window.location.href)
    const params = url.searchParams

    if(params && params.get('standalone') == true) {
      this.isPwa = true
    } else {
      this.isPwa = false
    }
  },
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
  right: 85px;
  top: 13px;
  z-index: 7;
  cursor: pointer;
  @media (max-width: 999px) {
    right: 50px;
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
