<template>
  <main class="mainContents">
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
    <section :class="['description', 'js-description', {jsAnimation: isLoaded}]">
      <div
        class="description__title"
        v-html="description_title"
      >
      </div>
      <div class="description__bodyWrapper">
        <div
          class="description__body"
          v-for="body in description_body"
          :key="description_body.index"
        >
          <div class="description__imageBox">
            <img
              :data-src="`${body.image.url}${descriptionImageParam}`"
              alt=""
              class="description__image lazyload lazyloadImage"
            >
          </div>
          <div
            class="description__leadBox"
            v-html="body.lead"
          >
          </div>
        </div>
      </div>
    </section>
    <section
      class="movie"
      v-for="movie in movie"
      :key="movie.index"
      v-html="movie.movie"
    >
    </section>
    <sectionsPhotogragh :category="id"/>
    <sectionsNotebookList/>
  </main>
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
      mainvisualUrl: "",
      descriptionImageParam: ""
    }
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.mainvisualUrl = `${this.mainvisual_sp.url}?dpr=2&w=365`
      this.descriptionImageParam = '?dpr=2&w=375'
    } else {
      this.mainvisualUrl = `${this.mainvisual.url}?dpr=2&w=1260`
      this.descriptionImageParam = '?dpr=2&w=640'
    }
  },
  methods: {
    onLoad() {
      this.isLoaded = true
      this.$nuxt.$emit("onLoad", this.isLoaded)
    }
  }
}
</script>

<style lang="scss" scoped>
$mainvisualAnimationStartDelay: 1s;
.mainvisual {
  height: 65vw;
  background: $gradient_primary;
  padding: 10px;
  position: relative;
  @media (max-width: 999px) {
    padding: 5px;
  }
  @media (max-width: 767px) {
    height: 140vw;
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
    width: 100%;
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
  max-width: 1600px;
  margin: 0px auto;
  &__title {
    /deep/ h2 {
      @include sectionTitle;
      font-family: $fontFamily_japanese;
      font-size: 3rem;
      line-height: 1.8;
      margin-top: 10vw;
      @media (max-width: 767px) {
        font-size: 1.8rem;
        margin-top: 20vw;
      }
    }
  }
  &__body {
    height: 50vw;
    display: flex;
    justify-content: space-between;
    @media (min-width: 1601px) {
      height: 800px;
    }
    @media (max-width: 767px) {
      height: auto;
      margin-bottom: 60px;
      display: block;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
  }
  &__imageBox {
    width: 50%;
    @media (max-width: 767px) {
      width: 100%;
      height: 100vw;
      margin-bottom: 0px;
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__leadBox {
    width: 50%;
    background-color: #101010;
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      width: 85%;
      background-color: transparent;
      border-width: 1px 0px 1px 0px;
      border-style: solid;
      border-color: rgba(222,222,222,0.6);
      margin: -10px auto 0px;
      padding: 20px 0px;
      position: relative;
      &:before,
      &:after {
        content: "";
        width: 1px;
        height: calc(100% - 30px);
        background-color: rgba(222,222,222,0.6);
        position: absolute;
        top: 15px;
        z-index: 1;
      }
      &:before {
        left: -15px;
      }
      &:after {
        right: -15px;
      }
    }
    /deep/ p {
      width: 100%;
      color: $color_lightGray !important;
      font-size: 1.6rem;
      font-weight: normal;
      line-height: 2.5;
      letter-spacing: 0.2em;
      text-align: center !important;
      @media (max-width: 999px) {
        font-size: 1.2rem;
        letter-spacing: 0.15em;
        text-align: center !important;
      }
    }
  }
}
.js-description {
  opacity: 0;
  transform: translateY(100px);
  transition: 1s $mainvisualAnimationStartDelay + 2.5s;
  &.jsAnimation {
    opacity: 1;
    transform: translateY(0px);
  }
}
.movie {
  max-width: 1280px;
  margin: 0px auto;
  padding-top: 150px;
  @media (max-width: 999px) {
    padding-top: 80px;
  }
  /deep/ h1,
  /deep/ h2,
  /deep/ h3 {
    @include sectionTitle;
  }
  /deep/ iframe {
    width: 70%;
    height: 42vw;
    margin: 0px auto 60px;
    display: block;
    @media (min-width:1281px) {
      height: 538px;
    }
    @media (max-width: 999px) {
      margin-bottom: 30px;
    }
    @media (max-width: 767px) {
      width: 100%;
      height: 56vw;
    }
    + p {
      display: none;
    }
  }
}
</style>