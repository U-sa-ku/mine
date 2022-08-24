<template>
  <main class="mainContents">
    <div class="photograph">
      <img
        :src="`${photoUrl}`"
        alt=""
        :class="['photograph__image',{jsAnimation: isLoaded}]"
        @load="onLoad"
      >
    </div>
    <nav class="photographNavigation">
      <div class="photographNavigation__inner">
        <nuxt-link
         :to="`/photograph/${prevphotograph.id}`"
         v-if="isShowPrevphotograph"
         class="photographNavigation__link photographNavigation__link--prev"
        >
          <span class="photographNavigation__caption">prev</span>
        </nuxt-link>

        <nuxt-link
         :to="`/photograph/`"
         class="photographNavigation__link photographNavigation__link--list"
        >
          <span class="photographNavigation__caption">list</span>
        </nuxt-link>


        <nuxt-link
          :to="`/photograph/${nextphotograph.id}`"
          v-if="isShowNextphotograph"
          class="photographNavigation__link photographNavigation__link--next"
        >
          <span class="photographNavigation__caption">next</span>
        </nuxt-link>
      </div>
    </nav>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      `https://mine.microcms.io/api/v1/photograph/${params.slug}`,
      {
        headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
      }
    )
    return data
  },
  async fetch() {
    const prevphotographRespons = await fetch(
      `https://mine.microcms.io/api/v1/photograph?limit=1&fields=id&orders-=publishedAt&filters=publishedAt[less_than]${this.publishedAt}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
    const nextphotographRespons = await fetch(
      `https://mine.microcms.io/api/v1/photograph?limit=1&fields=id&orders=publishedAt&filters=publishedAt[greater_than]${this.publishedAt}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())

    if(prevphotographRespons.contents.length != 0) {
      this.prevphotograph = prevphotographRespons.contents[0]
      this.isShowPrevphotograph = true
    }

    if(nextphotographRespons.contents.length != 0) {
      this.nextphotograph = nextphotographRespons.contents[0]
      this.isShowNextphotograph = true
    }
  },
  head(){
    return {
      title: `photograph | mine`,
      meta: [
        { hid: 'description', name: 'description', content: 'ミラーレス一眼で撮った写真' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.title} | photograph | mine` },
        { hid: 'og:description', property: 'og:description', content: 'ミラーレス一眼で撮った写真' },
        { hid: 'og:url', property: 'og:url', content: this.photo.url }
      ]
    }
  },
  data() {
    return {
      isLoaded: false,
      photoUrl: "",
      body: this.$route.body,
      prevphotograph: [],
      isShowPrevphotograph: false,
      nextphotograph: [],
      isShowNextphotograph: false
    }
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.photoUrl = `${this.photo.url}?dpr=2&w=365`
    } else {
      this.photoUrl = `${this.photo.url}?dpr=2&w=1260`
    }
  },
  methods: {
    onLoad() {
      this.isLoaded = true
      this.$nuxt.$emit("onLoad", this.isLoaded)
      this.$nuxt.$emit("initShowSiteHeader")
    }
  }
}
</script>

<style lang="scss" scoped>
.photograph {
  background-color: #000000;
  margin-bottom: 15px;
  position: relative;
  @media (min-width: 768px) {
    height: calc(100vh - 145px);
    margin-top: 70px;
  }
  @media (max-width: 999px) {
    height: calc(100vh - 110px);
    margin-top: 40px;
  }
  @media (max-width: 767px) {
    padding-top: 133.4%;
  }
  &__image {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 1s;
    &.jsAnimation {
      opacity: 1;
    }
  }
}
.photographNavigation {
  max-width: 1280px;
  margin: 0px auto;
  padding: 0px 30px;
  @media (max-width: 767px) {
    padding: 0px 15px;
  }
  &__inner {
    position: relative;
    @media (min-width: 768px) {
      padding-top: 60px;
    }
  }
  &__link {
    width: 110px;
    color: inherit;
    font-size: 1.8rem;
    text-decoration: none;
    letter-spacing: 0.1em;
    display: block;
    position: absolute;
    top: 0px;
    z-index: 1;
    @media (max-width: 999px) {
      width: 90px;
      font-size: 1.4rem;
    }
    &--prev,
    &--next {
      &:before {
        content: "";
        width: 100%;
        height: 15px;
        border-style: solid;
        border-color: $color_lightGray;
        display: block;
        position: absolute;
        bottom: -5px;
        z-index: 0;
        transition: 0.3s;
      }
      @media (min-width: 769px) {
        &:hover:before {
          transform: translateX(10px) skewX(45deg);
        }
      }
    }
    &--prev {
      padding-left: 30px;
      left: 0px;
      &:before {
        border-width: 0px 0px 1px 2px;
        left: 0px;
        transform-origin: 0% 100%;
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
      padding-right: 30px;
      right: 0px;
      &:before {
        border-width: 0px 2px 1px 0px;
        transform-origin: 1000% 100%;
        transform: skewX(45deg);
        right: 0px;
      }
    }
    &--list {
      text-align: center;
      position: absolute;
      left: 50%;
      z-index: 1;
      transform: translateX(-50%);
      &:before {
        content: "";
        width: 100%;
        height: 1px;
        background-color: $color_lightGray;
        position: absolute;
        left: 50%;
        bottom: -5px;
        z-index: 0;
        transform: translateX(-50%);
        transition: 0.3s;
      }
    }
  }
  &__caption {
    font-family: $fontFamily_english;
  }
}
</style>
<style lang="scss">
.siteHeader {
  background: none;
}
</style>