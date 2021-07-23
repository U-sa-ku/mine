<template>
  <section class="notebook">
    <h2 class="notebook__title">Notebook</h2>
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
              <source :srcset="`${notebook.mainvisual.url}?dpr=2&w=340&q=90`" media="(max-width: 767px)">
              <img
                :src="`${notebook.mainvisual.url}?dpr=2&w=1163&q=90`"
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
            <p class="notebook__articleDate">{{ notebook.publishedAt | moment }}</p>
            <p class="notebook__articleTitle">{{ notebook.title }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import moment from 'moment'
export default {
  async fetch() {
    this.notebooks = await fetch(
      `https://mine.microcms.io/api/v1/notebook?limit=5&filters=id[not_equals]${this.currentAritcle}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
  },
  data() {
    return {
      notebooks: []
    }
  },
  props: {
    currentAritcle: ""
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
  padding: 150px 30px;
  @media (max-width: 767px) {
    padding: 80px 15px;
  }
  &__title {
    @include sectionTitle;
  }
  &__list {
    list-style-type: none;
    padding: 0px;
    display: grid;
    grid-template-columns: 48% 48%;
    grid-gap: 4%;
    @media (max-width: 767px) {
      grid-template-columns: 100%;
      grid-gap: 0%;
    }
  }
  &__listItem {
    margin-bottom: 4%;
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
}
</style>
