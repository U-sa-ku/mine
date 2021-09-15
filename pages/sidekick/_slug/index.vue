<template>
  <div class="contentsWrapper">
    <Loading :isLoaded="isLoaded"/>
    <SiteHeaderLogo/>
    <HamburgerMenu :isLoaded="isLoaded"/>
    <div class="mainvisual">
      <img :src="mainvisualUrl"
        :alt="name"
        :class="['mainvisual__image', {jsAnimation: isLoaded}]"
        @load="onLoad"
      >
      <p :class="['mainvisual__category', {jsAnimation: isLoaded}]">{{ id }}</p>
      <h1 :class="['mainvisual__title', {jsAnimation: isLoaded}]">{{ maker }}<br>{{ name }}</h1>
      <p :class="['mainvisual__since', {jsAnimation: isLoaded}]">since {{ since_year }}.{{ since_month }}</p>

    </div>
    <section :class="['description', {jsAnimation: isLoaded}]">
       <div class="description__title" v-html="description_title"></div>
       <div class="description__body" v-html="description_body"></div>
    </section>
    <Photogragh :category="id"/>
    <Notebook/>
    <SiteFooter/> 
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://mine.microcms.io/api/v1/sidekick/${params.slug}`,
      {
        headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
      }
    )
    return data
  },
  head(){
    return {
      title: `${this.maker} ${this.name} | Sidekick | mine`,
      meta: [
        { hid: 'description', name: 'description', content: `${this.since_year}年${this.since_month}月から所有している${this.maker}の${this.name}。` },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.maker} ${this.name} | Sidekick | mine` },
        { hid: 'og:description', property: 'og:description', content: `${this.since_year}年${this.since_month}月から所有している${this.maker}の${this.name}。` },
        { hid: 'og:url', property: 'og:url', content: this.mainvisualUrl}
      ]
    }
  },
  data() {
    return {
      isLoaded: false,
      mainvisualUrl: ""
    }
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.mainvisualUrl = `${this.mainvisual_sp.url}?dpr=2&w=350&q=80`
      this.description_body = this.description_body.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?dpr=2&w=345&q=80"',
      )
    } else {
      this.mainvisualUrl = `${this.mainvisual.url}?dpr=2&w=1260&q=80`
      this.description_body = this.description_body.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?dpr=2&w=912&q=80"',
      )
    }
    const img = document.createElement('img');
    img.src = this.mainvisualUrl;
  },
  methods: {
    onLoad() {
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
$mainvisualAnimationStartDelay: 0s;
.mainvisual {
  height: 65vw;
  background: $gradient_primary;
  padding: 10px;
  position: relative;
  @media (max-width: 767px) {
    height: 140vw;
    padding: 5px;
  }
  @media (min-width: 1921px) {
    height: 100vh;
  }
  &__cover {
    width: 100%;
    height: 100%;
    background: $gradient_primary;
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 2;
    transition: 1s $mainvisualAnimationStartDelay;
    &.jsAnimation {
      opacity: 0;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: 1s;
    &.jsAnimation {
      opacity: 1;
    }
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
      font-size: 15vw;
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
    font-size: 9vw;
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
      font-size: 15vw;
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
      font-size: 4vw;
      bottom: -6vw;
    }
    &.jsAnimation {
      opacity: 1;
      transform: scaleY(1);
    }
  }
}
.description {
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 30px;
  opacity: 0;
  transition: 1s $mainvisualAnimationStartDelay;
  @media (max-width: 767px) {
    padding: 0px 15px;
  }
  &.jsAnimation {
    opacity: 1;
  }
  &__title {
    /deep/ h1,
    /deep/ h2,
    /deep/ h3,
    /deep/ p,
    /deep/ span {
      color: $color_lightGray !important;
      font-weight: normal;
      letter-spacing: 0.15em;
    }
    /deep/ h1,
    /deep/ h2,
    /deep/ h3,
    /deep/ p {
      @include sectionTitle;
      font-family: $fontFamily_japanese;
      font-size: 3rem;
      line-height: 1.8;
      margin: 10vw 0px 10px;
      @media (max-width: 767px) {
        font-size: 1.8rem;
        margin: 20vw 0px 20px;
      }
    }
  }
  &__body {
    /deep/ h1,
    /deep/ h2,
    /deep/ h3,
    /deep/ p,
    /deep/ span {
      color: $color_lightGray !important;
      font-weight: normal;
      letter-spacing: 0.15em;
    }
    /deep/ h1,
    /deep/ h2,
    /deep/ h3 {
      @include sectionTitle;
      line-height: 1.8;
      margin: 150px 0px 10px;
      @media (max-width: 767px) {
        margin: 80px 0px 20px;
      }
    }
    /deep/ p {
      font-size: 1.6rem;
      line-height: 2;
      @media (max-width: 767px) {
        font-size: 1.3rem;
        text-align: center !important;
      }
    }
    /deep/ img,
    /deep/ iframe {
      @media (min-width: 767px) {
        margin: 90px 0px 60px;
      }
      @media (max-width: 767px) {
        margin: 40px 0px 20px;
      }
    }
    /deep/ img {
      display: inline;
      @media (min-width: 768px) {
        max-width: 80%;
      }
    }
    /deep/ iframe {
      width: 80%;
      height: 42vw;
      margin-right: auto;
      margin-left: auto;
      display: block;
      @media (min-width: 1260px) {
        height: 510px;
      }
      @media (max-width: 767px) {
        width: 100%;
        height: 51vw;
      }
      + p {
        display: none;
      }
    }
  }
}
</style>