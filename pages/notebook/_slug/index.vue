<template>
  <main class="mainContents">
    <article class="notebook">
      <div class="notebook__mainvisual">
        <img
          :src="`${mainvisualUrl}`"
          alt=""
          :class="['notebook__mainvisualImage',{jsAnimation: isLoaded}]"
          @load="onLoad"
        >
        <div class="notebook__overview">
          <p class="notebook__date">
            <span :class="['notebook__overviewTextBackground',{jsAnimation: isLoaded}]">{{ date | moment }}</span>
          </p>
          <p class="notebook__title">
            <span :class="['notebook__overviewTextBackground',{jsAnimation: isLoaded}]">{{ title }}</span>
          </p>
        </div>
        <div :class="['notebook__mainvisualCover',{jsAnimation: isLoaded}]"></div>
      </div>
      <div class="notebook__body" v-html="body"></div>
    </article>
    <nav class="notebookNavigation">
      <nuxt-link
       :to="`/notebook/${prevNotebook.id}`"
       v-if="isShowPrevNotebook"
       class="notebookNavigation__link notebookNavigation__link--prev"
      >
        <span class="notebookNavigation__caption">prev notebook</span><br>
        {{ prevNotebook.title }}
      </nuxt-link>
      <nuxt-link
        :to="`/notebook/${nextNotebook.id}`"
        v-if="isShowNextNotebook"
        class="notebookNavigation__link notebookNavigation__link--next"
      >
        <span class="notebookNavigation__caption">next notebook</span><br>
        {{ nextNotebook.title }}
      </nuxt-link>
    </nav>
    <sectionsNotebookList :currentArticle="id"/>
  </main>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://mine.microcms.io/api/v1/notebook/${params.slug}`,
      {
        headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
      }
    )
    return data
  },
  async fetch() {
    const prevNotebookRespons = await fetch(
      `https://mine.microcms.io/api/v1/notebook?limit=1&fields=id,title&orders-=publishedAt&filters=publishedAt[less_than]${this.publishedAt}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
    const nextNotebookRespons = await fetch(
      `https://mine.microcms.io/api/v1/notebook?limit=1&fields=id,title&orders=publishedAt&filters=publishedAt[greater_than]${this.publishedAt}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())

    if(prevNotebookRespons.contents.length != 0) {
      this.prevNotebook = prevNotebookRespons.contents[0]
      this.isShowPrevNotebook = true
    }

    if(nextNotebookRespons.contents.length != 0) {
      this.nextNotebook = nextNotebookRespons.contents[0]
      this.isShowNextNotebook = true
    }
  },
  head(){
    return {
      title: `${this.title} | notebook | mine`,
      meta: [
        { hid: 'description', name: 'description', content: 'とある1日の出来事' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.title} | notebook | mine` },
        { hid: 'og:description', property: 'og:description', content: 'とある1日の出来事' },
        { hid: 'og:url', property: 'og:url', content: this.mainvisual.url }
      ]
    }
  },
  data() {
    return {
      isLoaded: false,
      mainvisualUrl: "",
      body: this.$route.body,
      prevNotebook: [],
      isShowPrevNotebook: false,
      nextNotebook: [],
      isShowNextNotebook: false
    }
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.mainvisualUrl = `${this.mainvisual.url}?dpr=2&h=667&q=80`
      this.body = this.body.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?dpr=2&w=330&q=80"',
      )
    } else {
      this.mainvisualUrl = `${this.mainvisual.url}?dpr=2&w=1280&q=80`
      this.body = this.body.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?dpr=2&w=798&q=80"',
      )
    }
    this.body = this.body.replace(
      /<img src=/g,
      '<img class="lazyload lazyloadImage" data-src='
    )
  },
  methods: {
    onLoad() {
      this.isLoaded = true
      this.$nuxt.$emit("onLoad", this.isLoaded)
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('YYYY.MM.DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.notebook {
  margin-bottom: 50px;
  $mainvisualAnimationStartDelay: 1.5s;
  &__mainvisual {
    height: 100vh;
    background-color: #000000;
    position: relative;
  }
  &__mainvisualImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: 1s;
    &.jsAnimation {
      opacity: 1;
    }
  }
  &__mainvisualCover {
    width: 100%;
    height: 100%;
    background: $gradient_primary;
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 2;
    transition: 1s;
    &.jsAnimation {
      opacity: 0;
    }
  }
  &__overview {
    position: absolute;
    right: 0%;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
  }
  &__date,
  &__title {
    text-align: right;
  }
  &__overviewTextBackground {
    background: $gradient_primary;
    padding: 3px 5px;
    position: relative;
    overflow: hidden;
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      background: $color_lightGray;
      display: block;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
      transform-origin: 100% 0%;
      transition: 1s;
    }
    &.jsAnimation:before {
      transform: scaleX(0);
    }
  }
  &__date {
    font-family: $fontFamily_english;
    font-size: 2rem;
    margin-bottom: 10px;
    @media (max-width: 999px) {
      font-size: 1.5rem;
    }
    .notebook__overviewTextBackground:before {
      transition-delay: $mainvisualAnimationStartDelay;
    }
  }
  &__title {
    font-size: 3rem;
    letter-spacing: 0.1em;
    @media (max-width: 999px) {
      font-size: 2.5rem;
    }
    .notebook__overviewTextBackground:before {
      transition-delay: $mainvisualAnimationStartDelay + 0.5s;
    }
  }
  &__body {
    max-width: 1200px;
    margin: 90px auto 0px;
    padding: 0px 30px;
    @media (max-width: 999px) {
      margin: 40px auto 0px;
      padding: 0px 15px;
    }
    /deep/ h1,
    /deep/ h2,
    /deep/ h3,
    /deep/ p,
    /deep/ span {
      color: $color_lightGray !important;
      font-weight: normal;
      letter-spacing: 0.15em;
    }
    /deep/ p {
      font-size: 1.6rem;
      line-height: 2;
      @media (max-width: 999px) {
        font-size: 1.3rem;
        text-align: center !important;
      }
    }
    /deep/ img {
      margin: 90px 0px 60px;
      display: inline;
      @media (min-width: 768px) {
        max-width: 70%;
        max-height: 700px;
      }
      @media (max-width: 999px) {
        margin: 40px 0px 20px;
      }
      @media (max-width: 767px) {
        max-height: 100vw;
      }
    }
    /deep/ iframe {
      width: 70%;
      height: 42vw;
      margin: 90px auto 60px;
      display: block;
      @media (min-width:1281px) {
        height: 538px;
      }
      @media (max-width: 999px) {
        margin: 40px auto 20px;
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
}
.notebookNavigation {
  padding-top: 60px;
  position: relative;
  @media (max-width: 767px) {
    padding: 0px 45px;
  }
  &__link {
    width: 400px;
    color: inherit;
    font-size: 1.8rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    display: block;
    position: absolute;
    top: 0px;
    z-index: 1;
    @media (max-width: 999px) {
      width: 40%;
      font-size: 1.4rem;
    }
    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 30px;
      display: inline-block;
      position: relative;
      &:last-child {
        margin-bottom: 0px;
      }
    }
    &:before {
      content: "";
      width: 100%;
      height: 15px;
      border-width: 0px 2px 1px 0px;
      border-style: solid;
      border-color: $color_lightGray;
      display: block;
      position: absolute;
      bottom: -5px;
      z-index: 0;
      transform: skewX(45deg);
      transition: 0.3s;
      @media (max-width: 767px) {
        width: calc(100% + 55px);
      }
    }
    @media (min-width: 769px) {
      &:hover:before {
        transform: translateX(10px) skewX(45deg);
      }
    }
    &--prev {
      left: 50px;
      @media (max-width: 767px) {
        left: 0px;
      }
      &:before {
        border-width: 0px 0px 1px 2px;
        left: -20px;
        transform: skewX(-45deg);
      }
      @media (min-width: 769px) {
        &:hover:before {
          transform: translateX(-10px) skewX(-45deg) !important;
        }
      }
    }
    &--next {
      text-align: right;
      right: 50px;
      @media (max-width: 767px) {
        right: 0px;
      }
      &:before {
        right: -20px;
      }
    }
  }
  &__caption {
    font-family: $fontFamily_english;
  }
}
</style>