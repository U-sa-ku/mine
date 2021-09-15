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
  padding: 20px 5vw;
  position: absolute;
  left: 0px;
  bottom: 0px;
  z-index: 1;
  @media (max-width: 767px) {
    text-align: center;
    display: block;
  }
  &__copyright {
    color: #ffffff;
    font-family: $fontFamily_english;
    font-size: 1rem;
    text-align: center;
    @media (max-width: 767px) {
      font-size: 0.8rem;
    }
  }
}
</style>
