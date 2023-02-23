<template>
  <section class="photoList">
    <h2 class="photoList__title">{{ sectionName }}</h2>
    <div :class="['js-contentsBody',{jsAnimation:isLoaded}]">
      <ul class="photoList__list">
        <li
          class="photoList__listItem"
          v-for="photo in photos"
          :key="photos.id"
          >
          <nuxt-link
            :to="`/${sectionName}/${photo.id}/?list=${currentPage}`"
            class="photoList__link"
            >
            <img
              :data-src="`${photo.photo.url}?dpr=2&w=${imageWidth}&q=80`"
              alt="photograph"
              class="photoList__image lazyload lazyloadImage"
              @load="onLoad"
              >
            <figure class="photoList__imageBoxFrame photoList__imageBoxFrame--top"></figure>
            <figure class="photoList__imageBoxFrame photoList__imageBoxFrame--right"></figure>
            <figure class="photoList__imageBoxFrame photoList__imageBoxFrame--bottom"></figure>
            <figure class="photoList__imageBoxFrame photoList__imageBoxFrame--left"></figure>
            <ElementsImageLoader/>
          </nuxt-link>
        </li>
      </ul>
      <ul class="photoList__pagination">
        <li
          class="photoList__paginationItem"
          v-for="n of paginationLength"
          :key="n"
          >
          <nuxt-link
            :class="['photoList__paginationLink', currentPage ==  n ? '--active' : '']"
            :to="`/${sectionName}/page/${n}/`"
            >
            {{ n }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isLoaded: false,
        imageWidth: null,
      }
    },
    props: {
      sectionName: undefined,
      photos: [],
      photosLimit: null,
      paginationLength: null,
      currentPage: null
    },
    mounted() {
      if(window.innerWidth <= 767) {
        this.imageWidth = 215
      } else {
        this.imageWidth = 356
      }
    },
    methods: {
      onLoad() {
        this.isLoaded = true
        this.$emit('onLoad', this.isLoaded)
        this.$nuxt.$emit('initShowSiteHeader')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photoList {
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
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 1px;
      @media (max-width: 767px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      @media (min-width: 1921px) {
        grid-template-columns: repeat(6, minmax(0, 1fr));
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
          .photoList__imageBoxFrame {
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
      $borderWidth: 1px;
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
        color: $color_middleGray;
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
  .js-contentsBody {
    opacity: 0;
    transform: translateY(50px);
    transition: 1s 0.5s;
    &.jsAnimation {
      transform: translateY(0px);
      opacity: 1;
    }
  }
</style>
