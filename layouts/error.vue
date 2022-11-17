<template>
  <main class="errorMessage">
    <div class="errorMessage__wrapper">
      <p class="errorMessage__statusCode">{{ error.statusCode }}</p>
      <p class="errorMessage__message">{{ error.message }}</p>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.$nuxt.$emit("onLoad", true)
    this.$nuxt.$emit("initShowSiteHeader")
  }
}
</script>

<style lang="scss" scoped>
.errorMessage {
  height: calc(100vh - 149px);
  margin-bottom: -300px;
  padding-top: 70px;
  box-sizing: content-box;
  @media (max-width: 999px) {
    height: calc(100vh - 89px);
    margin-bottom: -200px;
    padding-top: 40px;
  }
  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
  }
  &__statusCode {
    font-size: 8rem;
    letter-spacing: 0.1em;
    line-height: 1;
    margin-bottom: 10px;
    @media (max-width: 999px) {
      font-size: 4rem;
    }
  }
  &__message {
    font-size: 4rem;
    letter-spacing: 0.1em;
    @media (max-width: 999px) {
      font-size: 2rem;
    }
  }
}
</style>