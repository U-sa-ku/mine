<template>
  <main>
    <HamburgerMenu/>
    <div class="mainvisual">
      <div :class="['mainvisual__cover', {jsAnimation: isLoaded}]"></div>
      <img :src="mainvisual.url"
        :alt="name"
        :class="['mainvisual__image', {jsAnimation: isLoaded}]"
        @load="onLoad"
      >
      <p :class="['mainvisual__category', {jsAnimation: isLoaded}]">{{ id }}</p>
      <h1 :class="['mainvisual__title', {jsAnimation: isLoaded}]">{{ maker }}<br>{{ name }}</h1>
      <p :class="['mainvisual__since', {jsAnimation: isLoaded}]">since {{ since }}</p>

    </div>
    <div class="description" v-html="description"></div>
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
  methods: {
    onLoad() {
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.mainvisual {
  height: 60vw;
  background: $gradient_primary;
  padding: 10px;
  position: relative;
  @media (max-width: 767px) {
    height: 100vw;
  }
  $mainvisualAnimationStartDelay: 0.5s;
  &__cover {
    width: 100%;
    height: 100%;
    background: $gradient_primary;
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 2;
    opacity: 1;
    transition: 1s $mainvisualAnimationStartDelay;
    &.jsAnimation {
      opacity: 0;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__category {
    width: 60%;
    color: $color_lightGray;
    font-family: $fontFamily_english;
    font-size: 9vw;
    line-height: 1;
    text-align: right;
    mix-blend-mode: difference;
    position: absolute;
    right: 101vw;
    top: 0px;
    z-index: 1;
    opacity: 0;
    transform: rotate(-90deg);
    transform-origin: 100% 0%;
    transition: 1s $mainvisualAnimationStartDelay + 1s;
    @media (max-width: 767px) {
      width: 90%;
      font-size: 10vw;
    }
    &.jsAnimation {
      opacity: 1;
      transform: scaleY(1) rotate(-90deg);
    }
  }
  &__title {
    width: 100vw;
    color: $color_lightGray;
    font-family: $fontFamily_english;
    font-size: 6vw;
    line-height: 1;
    text-align: right;
    mix-blend-mode: difference;
    margin-bottom: -0.8vw;
    position: absolute;
    right: 0vw;
    bottom: 0vw;
    z-index: 1;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: 0% 100%;
    transition: 1s $mainvisualAnimationStartDelay + 1.5s;
    @media (max-width: 767px) {
      font-size: 10vw;
    }
    &.jsAnimation {
      opacity: 1;
      transform: scaleY(1);
    }
  }
  &__since {
    color: #ffffff;
    font-family: $fontFamily_english;
    font-size: 2vw;
    letter-spacing: 0.1em;
    position: absolute;
    right: 0px;
    bottom: -3vw;
    z-index: 1;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: 0% 100%;
    transition: 1s $mainvisualAnimationStartDelay + 2s;
    @media (max-width: 767px) {
      bottom: -4vw;
    }
    &.jsAnimation {
      opacity: 1;
      transform: scaleY(1);
    }
  }
}
.description {
  padding: 0px 5vw 150px;
  @media (max-width: 767px) {
    padding-bottom: 75px;
  }
  /deep/ h1,
  /deep/ h2,
  /deep/ h3,
  /deep/ p,
  /deep/ span {
    color: $color_lightGray !important;
    font-weight: normal;
    line-height: 2;
    letter-spacing: 0.2em;
  }
  /deep/ h1,
  /deep/ h2,
  /deep/ h3,
  /deep/ img {
    margin: 150px 0px;
    @media (max-width: 767px) {
      margin: 75px 0px;
    }
  }
  /deep/ h1 {
    font-size: 4rem;
    @media (max-width: 767px) {
      font-size: 3rem;
    }
  }
  /deep/ h2 {
    font-size: 3rem;
    @media (max-width: 767px) {
      font-size: 2rem;
    }
  }
  /deep/ h3 {
    font-size: 2rem;
    @media (max-width: 767px) {
      font-size: 1.8rem;
    }
  }
  /deep/ p {
    font-size: 1.8rem;
    @media (max-width: 767px) {
      font-size: 1.3rem;
    }
  }
}
</style>