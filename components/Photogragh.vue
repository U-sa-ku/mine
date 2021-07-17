<template>
  <section class="photogragh">
    <h2 class="photogragh__title">photogragh</h2>
    <!-- <ul class="photogragh__list">
      <li
        class="photogragh__listItem"
        v-for="photo in photogragh.contents"
        :key="photogragh.id"
      >
        <picture>
          <source :srcset="`${photo.photo.url}?dpr=2&w=355&q=90`" media="(max-width: 767px)">
          <img
            :src="`${photo.photo.url}?dpr=2&w=413&q=90`"
            alt=""
            class="photogragh__image"
          >
        </picture>
      </li>
    </ul> -->
    <client-only>
      <swiper
        class="photogragh__slider photogragh__slider--hero"
        :options="swiperHeroOption"
      >
        <swiper-slide
          class="photogragh__slide"
          v-for="photo in photogragh.contents"
          :key="photogragh.id"
        >
          <picture>
            <source :srcset="`${photo.photo.url}?dpr=2&w=355&q=90`" media="(max-width: 767px)">
            <img
              :src="`${photo.photo.url}?dpr=2&w=1280&q=90`"
              alt=""
              class="photogragh__image"
            >
          </picture>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </client-only>
  </section>
</template>

<script>
export default {
  async fetch() {
    this.photogragh = await fetch(
      `https://mine.microcms.io/api/v1/photogragh?limit=50${this.category === undefined ? '' : `&filters=category[equals]${this.category}`}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
  },
  data() {
    return {
      photogragh: [],
      isShow: false,
      swiperHeroOption: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  props: {
    category: undefined
  }
}
</script>

<style lang="scss" scoped>
.photogragh {
  padding: 10vw 0vw;
  @media (max-width: 767px) {
    padding: 15vw 0vw;
  }
  &__title {
    @include sectionTitle;
  }
  // &__list {
  //   list-style-type: none;
  //   background: #000000;
  //   padding: 10px;
  //   column-count: 3;
  //   column-gap: 10px;
  //   @media (max-width: 999px) {
  //     column-count: 2;
  //   }
  //   @media (max-width: 767px) {
  //     padding-bottom: 0px;
  //     column-count: 1;
  //   }
  // }
  // &__listItem {
  //   margin-bottom: 10px;
  // }
  &__slide {
    height: 51vw;
    background-color: #000000;
    position: relative;
    @media (max-width: 767px) {
      height: 120vw;
    }
  }
  &__image {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
  }
  .swiper-button {
    &-prev:after,
    &-next:after {
      content: "";
      width: 30px;
      height: 30px;
      border-width: 2px 2px 0px 0px;
      border-style: solid;
      border-color: $color_lightGray;
      display: block;
      position: absolute;
      top: 7px;
    }
    &-prev {
      transform: scaleY(2);
      @media (max-width: 767px) {
        display: none;
      }
      &:after {
        left: 6px;
        transform: rotate(-135deg);
      }
    }
    &-next {
      transform: scaleY(2);
      @media (max-width: 767px) {
        display: none;
      }
      &:after {
        right: 6px;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
