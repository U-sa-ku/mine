<template>
  <div class="contentsWrapper">
    <Loading :isLoaded="isLoaded"/>
    <SiteHeaderLogo/>
    <HamburgerMenu :isLoaded="isLoaded"/>
    <section :class="['notebook',{jsAnimation:isLoaded}]">
      <h2 class="notebook__title">notebook</h2>
      <ul class="notebook__list">
        <li
          class="notebook__listItem"
          v-for="notebook in contents"
          :key="contents.id"
        >
          <nuxt-link
            :to="`/notebook/${notebook.id}/`"
            class="notebook__link"
          >
            <div class="notebook__imageBox">
              <picture>
                <source :srcset="`${notebook.mainvisual.url}?dpr=2&w=345&q=80`" media="(max-width: 767px)">
                <img
                  :src="`${notebook.mainvisual.url}?dpr=2&w=585&q=80`"
                  alt=""
                  class="notebook__image"
                  @load="onLoad"
                >
              </picture>
              <figure class="notebook__imageBoxFrame notebook__imageBoxFrame--top"></figure>
              <figure class="notebook__imageBoxFrame notebook__imageBoxFrame--right"></figure>
              <figure class="notebook__imageBoxFrame notebook__imageBoxFrame--bottom"></figure>
              <figure class="notebook__imageBoxFrame notebook__imageBoxFrame--left"></figure>
            </div>
            <div class="notebook__articleOverview">
              <p class="notebook__articleDate">{{ notebook.date | moment }}</p>
              <p class="notebook__articleTitle">{{ notebook.title }}</p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="notebook__pagenation">
        <li
          class="notebook__pagenationItem"
          v-for="n of pagenationLength" :key="n">
          <nuxt-link
            :class="['notebook__pagenationLink', currentPage ==  n ? '--active' : '']"
            :to="`/notebook/page/${n}`">
            {{ n }}
          </nuxt-link>
        </li>
      </ul>
    </section>
    <SiteFooter/>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
  async asyncData({ params }) {
    const page = params.p || '1'
    const limit = 6
    const { data } = await axios.get(
      `https://mine.microcms.io/api/v1/notebook?limit=${limit}&offset=${(page - 1) * limit}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    )
    return data
  },
  head(){
    return {
      title: `notebook | mine`,
      meta: [
        { hid: 'description', name: 'description', content: 'とある1日の出来事' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `notebook | mine` },
        { hid: 'og:description', property: 'og:description', content: 'とある1日の出来事' },
        { hid: 'og:url', property: 'og:url', content: 'https://mine-u-saku.netlify.app/ogp.png' }
      ]
    }
  },
  data() {
    return {
      isLoaded: false,
      pagenationLength: null,
      currentPage: !this.$route.params.p ? 1 : null
    }
  },
  filters: {
    moment: (date) => {
      return moment(date).format('YYYY.MM.DD')
    }
  },
  mounted() {
    this.pagenationLength = Math.ceil(this.totalCount / this.limit)
  },
  methods: {
    onLoad() {
      this.isLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
.notebook {
  max-width: 1280px;
  margin: 0px auto;
  padding: 90px 30px 0px;
  opacity: 0;
  transform: translateY(100px);
  transition: 1s 0.5s;
  @media (max-width: 767px) {
    padding: 60px 15px 0px;
  }
  &.jsAnimation {
    transform: translateY(0px);
    opacity: 1;
  }
  &__title {
    @include sectionTitle;
  }
  &__list {
    list-style-type: none;
    margin-top: 0px;
    margin-bottom: 30px;
    padding: 0px;
    display: grid;
    grid-template-columns: 48% 48%;
    column-gap: 4%;
    @media (max-width: 767px) {
      margin-bottom: 10px;
      grid-template-columns: 100%;
      grid-gap: 0%;
    }
  }
  &__listItem {
    margin-bottom: 6%;
    @media (max-width: 767px) {
      margin-bottom: 10%;
    }
  }
  &__link {
    color: inherit;
    text-decoration: none;
    display: block;
    @media (min-width: 769px) {
      &:hover {
        .notebook__imageBoxFrame {
          transform: scale(1);
        }
      }
    }
  }
  &__imageBox {
    background-color: #000000;
    margin-bottom: 10px;
    padding-top: 75%;
    position: relative;
    overflow: hidden;
  }
  &__image {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    transition: 0.5s;
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
  &__articleOverview {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__articleDate {
    font-family: $fontFamily_english;
    font-size: 1.4rem;
    text-align: center;
    margin-right: 10px;
    @media (max-width: 767px) {
      font-size: 1.2rem;
    }
  }
  &__articleTitle {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
    text-align: center;
    @media (max-width: 767px) {
      font-size: 1.4rem;
    }
  }
  &__pagenation {
    list-style-type: none;
    padding-left: 0px;
    display: flex;
    justify-content: center;
  }
  &__pagenationItem {
    margin: 0px 10px;
    @media (max-width: 767px) {
      margin: 0px 5px;
    }
  }
  &__pagenationLink {
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
    @media (max-width: 767px) {
      font-size: 1.4rem;
    }
    @mixin pagenationHoverActive {
        color: $color_darkGray;
        background-color: $color_lightGray;
    }
    @media (min-width: 769px) {
      &:hover {
        @include pagenationHoverActive;
      }
    }
    &.--active {
      @include pagenationHoverActive;
    }
  }
}
</style>
