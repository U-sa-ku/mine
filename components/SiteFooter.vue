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
  background: $gradient_primary;
  margin-top: 150px;
  padding: 20px 5vw;
  @media (max-width: 767px) {
    text-align: center;
    margin-top: 80px;
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
