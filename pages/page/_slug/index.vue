<template>
  <main>
    <HamburgerMenu/>
    <div class="mainvisual">
      <img :src="mainvisual.url"
        :alt="name"
        :class="['mainvisual__image', {jsAnimation: isLoaded}]"
      >
      <div class="mainvisual__text">
        <h1 :class="['mainvisual__title', {jsAnimation: isLoaded}]">{{ maker }} {{ name }}</h1>
        <p :class="['mainvisual__since', {jsAnimation: isLoaded}]">since {{ since }}</p>
      </div>
    </div>
    <p class="description">{{ description }}</p>
    <siteFooter/> 
  </main>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://mine.microcms.io/api/v1/page/${params.slug}`,
      {
        headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
      }
    )
    return data
  },
  head(){
    return {
      title: `${this.maker} ${this.name} | mine`
    }
  },
  data() {
    return {
      isLoaded: false
    }
  },
  mounted() {
    window.addEventListener('load', this.onLoad)
  },
  methods: {
    onLoad() {
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.mainvisual {
  height: 90vh;
  background: $gradient_primary;
  padding: 10px;
  position: relative;
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(30px);
    transition: 1s;
    &.jsAnimation {
      filter: blur(0px);
    }
  }
  &__text {
    width: 100%;
    font-family: $fontFamily_english;
    line-height: 1;
    text-align: center;
    mix-blend-mode: difference;
    position: absolute;
    left: 50%;
    bottom: -8vh;
    z-index: 1;
    transform: translateX(-50%);
  }
  &__title {
    color: $color_lightGray;
    font-size: 10vw;
    display: inline-block;
    position: relative;
    opacity: 0;
    transform: scaleY(0%);
    transform-origin: 0% 100%;
    transition: 1s 1s;
    &.jsAnimation {
      opacity: 1;
      transform: scaleY(100%);
    }
  }
  &__since {
    color: #ffffff;
    font-size: 2vw;
    letter-spacing: 0.1em;
    position: relative;
    opacity: 0;
    transform: scaleY(0%);
    transform-origin: 0% 100%;
    transition: 1s 1.5s;
    &.jsAnimation {
      opacity: 1;
      transform: scaleY(100%);
    }
  }
}
.description {
  max-width: 700px;
  color: $color_lightGray;
  font-size: 1.6rem;
  line-height: 2;
  letter-spacing: 0.1em;
  text-align: center;
  margin: 10% auto 0%;
  padding: 0px 5vw;
}
</style>