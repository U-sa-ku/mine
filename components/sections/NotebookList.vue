<template>
  <section class="notebookList">
    <h2 class="notebookList__title">notebook</h2>
    <ul class="notebookList__list" v-if="notebooks.totalCount != 0">
      <li
        class="notebookList__listItem"
        v-for="notebook in notebooks.contents"
        :key="notebooks.id"
      >
        <nuxt-link
          :to="`/notebook/${notebook.id}/`"
          class="notebookList__link"
        >
          <div class="notebookList__imageBox">
            <picture>
              <source :data-srcset="`${notebook.mainvisual.url}?dpr=2&w=345&q=80`" media="(max-width: 767px)">
              <img
                :data-src="`${notebook.mainvisual.url}?dpr=2&w=585&q=80`"
                alt=""
                class="notebookList__image lazyload lazyloadImage"
              >
            </picture>
            <figure class="notebookList__imageBoxFrame notebookList__imageBoxFrame--top"></figure>
            <figure class="notebookList__imageBoxFrame notebookList__imageBoxFrame--right"></figure>
            <figure class="notebookList__imageBoxFrame notebookList__imageBoxFrame--bottom"></figure>
            <figure class="notebookList__imageBoxFrame notebookList__imageBoxFrame--left"></figure>
          </div>
          <div class="notebookList__notebookOverview">
            <p class="notebookList__notebookDate">{{ notebook.date | moment }}</p>
            <p class="notebookList__notebookTitle">{{ notebook.title }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <p class="notebookList__noPost" v-if="notebooks.totalCount == 0">no post</p>
    <div class="notebookList__moreButton" v-if="notebooks.totalCount != 0">
      <nuxt-link
        to="/notebook/"
        class="notebookList__moreLink"
      >
        more notebook
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  async fetch() {
    this.notebooks = await fetch(
      `https://mine.microcms.io/api/v1/notebook?limit=4&filters=id[not_equals]${this.currentArticle}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
  },
  data() {
    return {
      notebooks: [],
      totalCount: null
    }
  },
  props: {
    currentArticle: ""
  },
  filters: {
    moment: (date) => {
      return moment(date).format('YYYY.MM.DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.notebookList {
  max-width: 1280px;
  margin: 0px auto;
  padding: 150px 30px 0px;
  @media (max-width: 999px) {
    padding: 80px 15px 0px;
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
        .notebookList__imageBoxFrame {
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
  &__notebookOverview {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  &__notebookDate {
    font-family: $fontFamily_english;
    font-size: 1.4rem;
    text-align: center;
    margin-right: 10px;
    @media (max-width: 999px) {
      font-size: 1.2rem;
    }
  }
  &__notebookTitle {
    font-size: 1.8rem;
    letter-spacing: 0.1em;
    text-align: center;
    @media (max-width: 999px) {
      font-size: 1.4rem;
    }
  }
  &__moreButton {
    text-align: center;
  }
  &__moreLink {
    color: inherit;
    font-family: $fontFamily_english;
    font-size: 2rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    position: relative;
    @media (max-width: 999px) {
      font-size: 1.6rem;
    }
    &:before {
      content: "";
      width: calc(100% + 40px);
      height: 50%;
      border-width: 0px 2px 1px 0px;
      border-style: solid;
      border-color: $color_lightGray;
      display: block;
      position: absolute;
      left: 50%;
      bottom: -5px;
      z-index: 0;
      transform: translateX(-50%) skewX(45deg);
      transition: 0.3s;
    }
    @media (min-width: 769px) {
      &:hover:before {
        transform: translateX(calc(-50% + 10px)) skewX(45deg);
      }
    }
  }
  &__noPost {
    font-family: $fontFamily_english;
    font-size: 2.4rem;
    text-align: center;
    letter-spacing: 0.1em;
    margin: 100px 0px;
    @media (max-width: 999px) {
      font-size: 1.8rem;
      margin: 70px 0px;
    }
  }
}
</style>
