<template>
  <div class="contentsWrapper">
    <Loading :isLoaded="isLoaded"/>
    <SiteHeaderLogo/>
    <HamburgerMenu :isLoaded="isLoaded"/>
    <article class="article">
      <div class="article__mainvisual">
        <img
          :src="`${mainvisualUrl}`"
          alt=""
          :class="['article__mainvisualImage',{jsAnimation: isLoaded}]"
          @load="onLoad"
        >
        <div class="article__articleOverview">
          <p class="article__articleDate">
            <span :class="['article__articleOverviewTextBackground',{jsAnimation: isLoaded}]">{{ date | moment }}</span>
          </p>
          <p class="article__articleTitle">
            <span :class="['article__articleOverviewTextBackground',{jsAnimation: isLoaded}]">{{ title }}</span>
          </p>
        </div>
        <div :class="['article__mainvisualCover',{jsAnimation: isLoaded}]"></div>
      </div>
      <div class="article__body" v-html="body"></div>
    </article>
    <nav class="navigation">
      <nuxt-link
       :to="`/notebook/${prevNotebook.id}`"
       v-if="isShowPrevNotebook"
       class="navigation__link navigation__link--prev"
      >
        prev notebook<br>
        {{ prevNotebook.title }}
      </nuxt-link>
      <nuxt-link
        :to="`/notebook/${nextNotebook.id}`"
        v-if="isShowNextNotebook"
        class="navigation__link navigation__link--next"
      >
        next notebook<br>
        {{ nextNotebook.title }}
      </nuxt-link>
    </nav>
    <Notebook :currentArticle="id"/>
    <SiteFooter/>
  </div>
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
      this.mainvisualUrl = `${this.mainvisual.url}?dpr=2&w=1260&q=80`
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
.article {
  margin-bottom: 50px;
  $mainvisualAnimationStartDelay: 1s;
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
  &__articleOverview {
    position: absolute;
    right: 0%;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
  }
  &__articleDate,
  &__articleTitle {
    text-align: right;
  }
  &__articleOverviewTextBackground {
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
  &__articleDate {
    font-family: $fontFamily_english;
    font-size: 2rem;
    margin-bottom: 10px;
    @media (max-width: 999px) {
      font-size: 1.5rem;
    }
    .article__articleOverviewTextBackground:before {
      transition-delay: $mainvisualAnimationStartDelay;
    }
  }
  &__articleTitle {
    font-size: 3rem;
    letter-spacing: 0.1em;
    @media (max-width: 999px) {
      font-size: 2.5rem;
    }
    .article__articleOverviewTextBackground:before {
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
    /deep/ img,
    /deep/ iframe {
      margin: 90px 0px 60px;
      @media (max-width: 999px) {
        margin: 40px 0px 20px;
      }
    }
    /deep/ img {
      display: inline;
      @media (min-width: 768px) {
        max-width: 70%;
      }
    }
  }
}
.navigation {
  padding-top: 60px;
  position: relative;
  @media (max-width: 767px) {
    padding: 0px 45px;
  }
  &__link {
    width: 400px;
    color: inherit;
    font-family: $fontFamily_english;
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
}
</style>