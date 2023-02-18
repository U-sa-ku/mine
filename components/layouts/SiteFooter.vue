<template>
  <footer class="siteFooter">
    <p class="siteFooter__copyright">&copy;mine All Rights Reserved</p>
  </footer>
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
  .siteFooter {
    width: 100%;
    background: $gradient_primary;
    padding: 32px 0px;
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    @media (max-width: 999px) {
      text-align: center;
      padding: 17px 0px;
      display: block;
    }
    &__copyright {
      color: #ffffff;
      font-family: $fontFamily_english;
      font-size: 1rem;
      letter-spacing: 0.2em;
      text-align: center;
      @media (max-width: 999px) {
        font-size: 0.8rem;
      }
    }
  }
</style>
