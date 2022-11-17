<template>
  <main :class="['mainContents','js-mainContents',{jsAnimation:isLoaded}]">
    <section class="photographList">
      <h2 class="photographList__title">photograph</h2>
      <ul class="photographList__list">
        <li
          class="photographList__listItem"
          v-for="photograph in contents"
          :key="contents.id"
        >
          <nuxt-link
            :to="`/photograph/${photograph.id}/?list=${currentPage}`"
            class="photographList__link"
          >
            <img
              :data-src="`${photograph.photo.url}?dpr=2&w=${photoWidth}&q=80`"
              alt=""
              class="photographList__image lazyload lazyloadImage"
              @load="onLoad"
            >
            <figure class="photographList__imageBoxFrame photographList__imageBoxFrame--top"></figure>
            <figure class="photographList__imageBoxFrame photographList__imageBoxFrame--right"></figure>
            <figure class="photographList__imageBoxFrame photographList__imageBoxFrame--bottom"></figure>
            <figure class="photographList__imageBoxFrame photographList__imageBoxFrame--left"></figure>
            <ObjectsImageLoading/>
          </nuxt-link>
        </li>
      </ul>
      <ul class="photographList__pagination">
        <li
          class="photographList__paginationItem"
          v-for="n of paginationLength" :key="n">
          <nuxt-link
            :class="['photographList__paginationLink', currentPage ==  n ? '--active' : '']"
            :to="`/photograph/page/${n}/`">
            {{ n }}
          </nuxt-link>
        </li>
      </ul>
    </section>
    <sectionsSnapshot/>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData({ params }) {
    const page = params.p || '1'
    const limit = 24
    const { data } = await axios.get(
      `https://mine.microcms.io/api/v1/photograph?limit=${limit}&orders=-publishedAt&offset=${(page - 1) * limit}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    )
    return data
  },
  head(){
    return {
      title: `photograph | mine`,
      meta: [
        { hid: 'description', name: 'description', content: 'ミラーレス一眼で撮った写真の一覧' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `photograph | mine` },
        { hid: 'og:description', property: 'og:description', content: 'ミラーレス一眼で撮った写真の一覧' },
        { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` }
      ]
    }
  },
  data() {
    return {
      isLoaded: false,
      paginationLength: null,
      currentPage: null,
      photoWidth: null
    }
  },
  mounted() {
    this.paginationLength = Math.ceil(this.totalCount / this.limit)
    this.currentPage = !this.$route.params.p ? '1' : this.$route.params.p

    if(window.innerWidth <= 767) {
      this.photoWidth = 124
    } else {
      this.photoWidth = 355
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
.photographList {
  padding: 150px 0px 0px;
  @media (max-width: 999px) {
    padding-top: 90px;
  }
  @media (max-width: 767px) {
    padding: 90px 0px 0px;
  }
  &__title {
    @include sectionTitle;
  }
  &__list {
    list-style-type: none;
    margin-bottom: 30px;
    padding: 0px;
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1px;
    @media (max-width: 999px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media (max-width: 767px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  &__listItem {
    padding-bottom: 100%;
    position: relative;
  }
  &__link {
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
    background-color: #000000;
    position: absolute;
    left: 0px;
    top: 0px;
    display: block;
    @media (min-width: 769px) {
      &:hover {
        .photographList__imageBoxFrame {
          transform: scale(1);
        }
      }
    }
  }
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__imageBoxFrame {
    background-color: #ffffff;
    position: absolute;
    z-index: 2;
    transform: scale(0);
    transition: 0.5s;
    $borderOffset: 10px;
    $borderWidth: 2px;
    &--top {
      width: calc(100% - #{$borderOffset*2});
      height: $borderWidth;
      left: $borderOffset;
      top: $borderOffset;
      transform-origin: 0% 0%;
    }
    &--right {
      width: $borderWidth;
      height: calc(100% - #{$borderOffset*2});
      right: $borderOffset;
      top: $borderOffset;
      transform-origin: 100% 0%;
    }
    &--bottom {
      width: calc(100% - #{$borderOffset*2});
      height: $borderWidth;
      left: $borderOffset;
      bottom: $borderOffset;
      transform-origin: 100% 100%;
    }
    &--left {
      width: $borderWidth;
      height: calc(100% - #{$borderOffset*2});
      left: $borderOffset;
      top: $borderOffset;
      transform-origin: 0% 100%;
    }
  }
  &__pagination {
    list-style-type: none;
    padding-left: 0px;
    display: flex;
    justify-content: center;
  }
  &__paginationItem {
    margin: 0px 10px;
    @media (max-width: 767px) {
      margin: 0px 5px;
    }
  }
  &__paginationLink {
    width: 30px;
    height: 30px;
    color: inherit;
    font-family: $fontFamily_english;
    font-size: 1.6rem;
    text-align: center;
    text-decoration: none;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    @media (max-width: 999px) {
      font-size: 1.4rem;
    }
    @mixin paginationHoverActive {
      color: $color_darkGray;
      background-color: $color_lightGray;
    }
    @media (min-width: 769px) {
      &:hover {
        @include paginationHoverActive;
      }
    }
    &.--active {
      @include paginationHoverActive;
    }
  }
}
.js-mainContents {
  opacity: 0;
  transform: translateY(100px);
  transition: 1s 0.5s;
  &.jsAnimation {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>