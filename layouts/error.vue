<template>
  <main class="errorMessage">
    <div class="errorMessage__wrapper">
      <p class="errorMessage__message">error</p>
    </div>
  </main>
</template>

<script>
export default {
  props: ['error'],
  mounted() {
    this.$nuxt.$emit("onLoad", true)
    this.$nuxt.$emit("initShowSiteHeader")
  }
}
</script>

<style lang="scss" scoped>
.errorMessage {
  height: calc(100vh - 149px);
  padding-top: 70px;
  @media (max-width: 999px) {
    height: calc(100vh - 89px);
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
  &__message {
    font-size: 4rem;
    letter-spacing: 0.1em;
    @media (max-width: 999px) {
      font-size: 2.6rem;
    }
  }
}
</style>
<style lang="scss">
.contentsWrapper {
  padding-bottom: 0px !important;
}
</style>