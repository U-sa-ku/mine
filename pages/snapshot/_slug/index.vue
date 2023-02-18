<template>
  <main class="mainContents">
    <div class="snapshot">
      <img
        :src="`${photoUrl}`"
        alt=""
        :class="['snapshot__image',{jsAnimation: isLoaded}]"
        @load="onLoad"
      >
    </div>
    <nav class="snapshotNavigation">
      <div class="snapshotNavigation__inner">
        <nuxt-link
         :to="`/snapshot/${prevsnapshot.id}/?list=${listNumber}`"
         v-if="isShowPrevsnapshot"
         class="snapshotNavigation__link snapshotNavigation__link--prev"
        >
          <span class="snapshotNavigation__caption">prev</span>
        </nuxt-link>
        <nuxt-link
         :to="`/snapshot/page/${listNumber}/`"
         class="snapshotNavigation__link snapshotNavigation__link--list"
        >
          <span class="snapshotNavigation__listIcon">
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
            <i class="snapshotNavigation__listIconSquare"></i>
          </span>
        </nuxt-link>
        <nuxt-link
          :to="`/snapshot/${nextsnapshot.id}/?list=${listNumber}`"
          v-if="isShowNextsnapshot"
          class="snapshotNavigation__link snapshotNavigation__link--next"
        >
          <span class="snapshotNavigation__caption">next</span>
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
      `https://mine.microcms.io/api/v1/photo/${params.slug}`,
      {
        headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
      }
    )
    return data
  },
  async fetch() {
    const prevSnapshotRespons = await fetch(
      `https://mine.microcms.io/api/v1/photo?limit=1&fields=id&orders=-publishedAt&filters=category[contains]snapshot[and]publishedAt[less_than]${this.publishedAt}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
    const nextsnapshotRespons = await fetch(
      `https://mine.microcms.io/api/v1/photo?limit=1&fields=id&orders=publishedAt&filters=category[contains]snapshot[and]publishedAt[greater_than]${this.publishedAt}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())

    if(prevSnapshotRespons.contents.length != 0) {
      this.prevsnapshot = prevSnapshotRespons.contents[0]
      this.isShowPrevsnapshot = true
    }

    if(nextsnapshotRespons.contents.length != 0) {
      this.nextsnapshot = nextsnapshotRespons.contents[0]
      this.isShowNextsnapshot = true
    }
  },
  head(){
    return {
      title: `snapshot | mine`,
      meta: [
        { hid: 'description', name: 'description', content: 'ミラーレス一眼で撮った写真' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `snapshot | mine` },
        { hid: 'og:description', property: 'og:description', content: 'ミラーレス一眼で撮った写真' },
        { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` }
      ]
    }
  },
  data() {
    return {
      isLoaded: false,
      photoUrl: "",
      prevsnapshot: [],
      isShowPrevsnapshot: false,
      nextsnapshot: [],
      isShowNextsnapshot: false,
      listNumber: null
    }
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.photoUrl = `${this.photo.url}?dpr=2&w=375`
    } else {
      this.photoUrl = `${this.photo.url}?dpr=2&w=1440`
    }

    this.listNumber = !this.$route.query.list ? '1' : this.$route.query.list
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
.snapshot {
  background-color: #000000;
  margin-bottom: 15px;
  position: relative;
  @media (min-width: 768px) {
    height: calc(100vh - 145px);
    margin-top: 70px;
  }
  @media (max-width: 999px) {
    height: calc(100vh - 93px);
    height: calc(100dvh - 93px);
    margin-top: 40px;
    margin-bottom: 10px;
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
.snapshotNavigation {
  max-width: 1280px;
  margin: 0px auto;
  padding: 0px 30px;
  @media (max-width: 767px) {
    padding: 0px 15px;
  }
  &__inner {
    width: 24px;
    margin: 0px auto;
    position: relative;
    @media (min-width: 768px) {
      padding-top: 60px;
    }
  }
  &__link {
    color: inherit;
    font-size: 1.8rem;
    text-decoration: none;
    letter-spacing: 0.1em;
    display: block;
    position: absolute;
    z-index: 1;
    &--prev,
    &--next {
      width: 110px;
      top: 0px;
      @media (max-width: 999px) {
        width: 90px;
        font-size: 1.4rem;
      }
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
      right: 70px;
      @media (max-width: 999px) {
        right: 45px;
      }
      &:before {
        border-width: 0px 0px 1px 1.5px;
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
      left: 70px;
      @media (max-width: 999px) {
        left: 45px;
      }
      &:before {
        border-width: 0px 1.5px 1px 0px;
        transform-origin: 1000% 100%;
        transform: skewX(45deg);
        right: 0px;
      }
    }
    &--list {
      position: absolute;
      left: 50%;
      top: 5px;
      z-index: 1;
      transform: translateX(-50%);
    }
  }
  &__caption {
    font-family: $fontFamily_english;
  }
  &__listIcon {
    width: 30px;
    height: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 5px;
    @media (max-width: 999px) {
      width: 24px;
      height: 24px;
      gap: 4px;
    }
    @media (min-width: 769px) {
      transition: 0.3s;
      &:hover {
        gap: 3px;
      }
    }
  }
  &__listIconSquare {
    background-color: $color_lightGray;
  }
}
</style>