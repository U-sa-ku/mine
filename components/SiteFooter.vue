<template>
  <footer class="siteFooter">
    <nuxt-link to="/">
      <MineLogo class="siteFooter__logo" :isLoaded="true"/>
    </nuxt-link>
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
  padding: 30px 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    text-align: center;
    display: block;
  }
  &__logo {
    width: 80px;
    @media (max-width: 767px) {
      width: 60px;
      margin-bottom: 20px;
    }
  }
  &__copyright {
    color: #ffffff;
    font-family: $fontFamily_english;
    font-size: 1rem;
    @media (max-width: 767px) {
      font-size: 0.8rem;
    }
  }
}
</style>
