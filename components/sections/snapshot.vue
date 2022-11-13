<template>
  <section class="snapshot">
    <h2 class="snapshot__title">snapshot</h2>
    <div class="snapshot__slider">
      <client-only>
        <swiper
          class="snapshot__slider snapshot__slider--hero"
          :options="swiperOption"
        >
          <swiper-slide
            class="snapshot__slide"
            v-for="snapshot in snapshots.contents"
            :key="snapshot.id"
          >
            <img
              :data-src="`${snapshot.photo.url}?dpr=2&w=${photoWidth}&q=80`"
              alt=""
              class="snapshot__image lazyload lazyloadImage"
            >
            <ObjectsImageLoading/>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </client-only>
    </div>
    <p class="snapshot__noPost" v-if="snapshots.totalCount == 0">no post</p>
    <div class="snapshot__moreButton" v-if="snapshots.totalCount != 0">
      <nuxt-link
        to="/snapshot/"
        class="snapshot__moreLink"
      >
        more snapshot
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  async fetch() {
    this.snapshots = await fetch(
      "https://mine.microcms.io/api/v1/snapshot?limit=50",
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
  },
  data() {
    return {
      snapshots: [],
      swiperOption: {
        slidesPerView: 1.1,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        loopAdditionalSlides: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1281: {
            slidesPerView: 1.295
          },
          1921: {
            slidesPerView: 2
          }
        }
      },
      photoWidth: null
    }
  },
  mounted() {
    if(window.innerWidth <= 767) {
      this.photoWidth = 340
    } else {
      this.photoWidth = 1210
    }
  }
}
</script>

<style lang="scss" scoped>
.snapshot {
  padding-top: 200px;
  @media (max-width: 999px) {
    padding-top: 100px;
  }
  &__title {
    @include sectionTitle;
  }
  &__slider {
    margin-bottom: 50px;
    @media (max-width: 999px) {
      margin-bottom: 30px;
    }
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
