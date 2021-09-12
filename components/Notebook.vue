<template>
  <section class="notebook">
    <h2 class="notebook__title">notebook</h2>
    <ul class="notebook__list">
      <li
        class="notebook__listItem"
        v-for="notebook in notebooks.contents"
        :key="notebooks.id"
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
    <div class="notebook__moreButton">
      <nuxt-link
        to="/notebook/"
        class="notebook__moreLink"
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
      notebooks: []
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
.notebook {
  max-width: 1280px;
  margin: 0px auto;
  padding: 150px 30px 0px;
  @media (max-width: 767px) {
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
    @media (max-width: 767px) {
      font-size: 1.6rem;
    }
    &:before {
      content: "";
      width: 120%;
      height: 50%;
      border-width: 0px 2px 1px 0px;
      border-style: solid;
      border-color: $color_lightGray;
      display: block;
      position: absolute;
      left: -12%;
      bottom: -5px;
      z-index: 0;
      transform: skewX(45deg);
      transition: 0.3s;
    }
    @media (min-width: 769px) {
      &:hover:before {
        transform: skewX(45deg) translateX(10px);
      }
    }
  }
}
</style>
