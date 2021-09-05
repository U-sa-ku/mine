<template>
  <main>
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
    <Notebook :currentArticle="id"/>
    <SiteFooter/>
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
      body: this.$route.body
    }
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.mainvisualUrl = `${this.mainvisual.url}?dpr=2&h=667&q=90`
      this.body = this.body.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?dpr=2&w=345&q=90"',
      )
    } else {
      this.mainvisualUrl = `${this.mainvisual.url}?dpr=2&w=1280&q=90`
      this.body = this.body.replace(
        /"(https?:\/\/images\.microcms-assets\.io\/.+?\.(jpe?g|gif|png))"/g,
        '"$1?dpr=2&w=912&q=90"',
      )
    }
    const img = document.createElement('img');
    img.src = this.mainvisualUrl;
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
    @media (max-width: 767px) {
      font-size: 1.5rem;
    }
    .article__articleOverviewTextBackground:before {
      transition-delay: $mainvisualAnimationStartDelay;
    }
  }
  &__articleTitle {
    font-size: 3rem;
    letter-spacing: 0.1em;
    @media (max-width: 767px) {
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
    @media (max-width: 767px) {
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
      font-size: 2rem;
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
  }
}
</style>