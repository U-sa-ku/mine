<template>
  <section class="photogragh">
    <h2 class="photogragh__title">photogragh</h2>
    <client-only>
      <swiper
        class="photogragh__slider photogragh__slider--hero"
        :options="swiperOption"
      >
        <swiper-slide
          class="photogragh__slide"
          v-for="photogragh in photograghs.contents"
          :key="photogragh.id"
        >
          <picture>
            <source :data-srcset="`${photogragh.photo.url}?dpr=2&w=340&q=80`" media="(max-width: 767px)">
            <img
              :data-src="`${photogragh.photo.url}?dpr=2&w=1163&q=80`"
              alt=""
              class="photogragh__image lazyload lazyloadImage"
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
    this.photograghs = await fetch(
      `https://mine.microcms.io/api/v1/photogragh?limit=50${this.category === undefined ? '' : `&filters=category[equals]${this.category}`}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
  },
  data() {
    return {
      photograghs: [],
      swiperOption: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1281: {
            slidesPerView: 1.3
          },
          1921: {
            slidesPerView: 2
          }
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
  padding-top: 150px;
  @media (max-width: 999px) {
    padding-top: 80px;
  }
  &__title {
    @include sectionTitle;
  }
  &__slide {
    background-color: #000000;
    position: relative;
    @media (max-width: 767px) {
      height: 121vw;
    }
    @media (min-width: 768px) {
      height: 51vw;
    }
    @media (min-width: 1281px) {
      height: 43vw;
    }
    @media (min-width: 1921px) {
      height: 28vw;
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
    pointer-events: none;
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
      @media (max-width: 768px) {
        display: none;
      }
      &:after {
        left: 6px;
        transform: rotate(-135deg);
      }
    }
    &-next {
      transform: scaleY(2);
      @media (max-width: 768px) {
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
