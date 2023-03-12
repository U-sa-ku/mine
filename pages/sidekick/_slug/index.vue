<template>
  <main class="mainContents">
    <div class="mainvisual">
      <div
        :class="['initMainvisual__wrapper', {jsAnimation: isLoaded}]"
        >
        <picture>
          <source :srcset="`${initMainvisualPath}&fm=webp`" type="image/webp"/>
          <img :src="initMainvisualPath"
            :alt="name"
            class="initMainvisual__image"
            @load="onLoad"
            >
        </picture>
      </div>
      <picture>
        <source :srcset="`${mainvisualPath}&fm=webp`" type="image/webp"/>
        <img :src="mainvisualPath"
          :alt="name"
          class="mainvisual__image"
          >
      </picture>
      <!-- <p :class="['mainvisual__category', {jsAnimation: isLoaded}]">{{ id }}</p> -->
      <p :class="['mainvisual__catch', 'mainvisual__catch--row1', {jsAnimation: isLoaded}]">{{ catchphrase.catchphrase1 }}</p>
      <p :class="['mainvisual__catch', 'mainvisual__catch--row2', {jsAnimation: isLoaded}]">{{ catchphrase.catchphrase2 }}</p>
      <h1 :class="['mainvisual__title', {jsAnimation: isLoaded}]">
        <span class="mainvisual__titleInner">{{ maker }} {{ name }}</span>
      </h1>
      <p :class="['mainvisual__since', {jsAnimation: isLoaded}]">since {{ since_year }}.{{ since_month }}</p>
    </div>
    <div class="contentsBody">
      <i :class="[`scrollIcon`, {jsAnimation: isLoaded}]"></i>
      <div :class="['js-contentsBody', {jsAnimation: isLoaded}]">
        <section class="description">
          <div
            class="description__title"
            v-html="description_title"
            >
          </div>
          <div class="description__bodyWrapper">
            <div
              class="description__body"
              v-for="body in description_body"
              :key="description_body.index"
              >
              <div class="description__imageBox">
                <picture>
                  <source :srcset="`${body.image.url}?dpr=${imageDevicePixelRatio}&w=${descriptionImageWidth}&fm=webp`" type="image/webp"/>
                  <img
                    :data-src="`${body.image.url}?dpr=${imageDevicePixelRatio}&w=${descriptionImageWidth}`"
                    alt=""
                    class="description__image lazyload lazyloadImage"
                    >
                </picture>
                <ElementsImageLoader/>
              </div>
              <div
                class="description__leadBox"
                v-html="body.lead"
                >
              </div>
            </div>
          </div>
        </section>
        <section
          class="movie"
          v-if="movie.length != 0"
          >
          <h2 class="movie__title">movie</h2>
          <ul class="movie__list">
            <li
              class="movie__item"
              v-for="movie in movie"
              :key="movie.index"
              >
              <iframe
                :data-src="`https://www.youtube.com/embed/${movie.movie_id}`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
                class="movie__iframe lazyload lazyloadImage"
               >
              </iframe>
              <ElementsImageLoader/>
            </li>
          </ul>
        </section>
        <sectionsPhotoSlider
          sectionName="photograph"
          :photos="photographs"
          />
        <sectionsPhotoSlider
          sectionName="snapshot"
          :photos="snapshots"
          />
      </div>
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
  export default {
    async asyncData({ params }) {
      const { data } = await axios.get(
        `https://mine.microcms.io/api/v1/sidekick/${params.slug}`,
        {
          headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
        }
      )
      return data
    },
    async fetch() {
      this.photographs = await fetch(
        `https://mine.microcms.io/api/v1/photo?limit=50&filters=category[contains]photograph[and]sidekick[contains]${this.id}`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      ).then(res => res.json())

      this.snapshots = await fetch(
        `https://mine.microcms.io/api/v1/photo?limit=50&filters=category[contains]snapshot[and]sidekick[contains]${this.id}`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      ).then(res => res.json())
    },
    head(){
      return {
        title: `${this.maker} ${this.name} | Sidekick | mine`,
        meta: [
          { hid: 'description', name: 'description', content: `${this.since_year}年${this.since_month}月から所有している${this.maker}の${this.name}。` },
          { hid: 'og:type', property: 'og:type', content: 'article' },
          { hid: 'og:title', property: 'og:title', content: `${this.maker} ${this.name} | Sidekick | mine` },
          { hid: 'og:description', property: 'og:description', content: `${this.since_year}年${this.since_month}月から所有している${this.maker}の${this.name}。` },
          { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` }
        ]
      }
    },
    data() {
      return {
        isLoaded: false,
        imageDevicePixelRatio: null,
        initMainvisualPath: null,
        mainvisualPath: null,
        mainvisualWidth: null,
        descriptionImageWidth: null,
        movieLength: this.movie,
        photographs: [],
        snapshots: []
      }
    },
    mounted() {
      if(window.innerWidth <= 767) {
        this.imageDevicePixelRatio = 3
        this.mainvisualWidth = 380
        this.initMainvisualPath = `${this.init_mainvisual_sp.url}?dpr=${this.imageDevicePixelRatio}&w=${this.mainvisualWidth}`
        this.mainvisualPath = `${this.mainvisual_sp.url}?dpr=${this.imageDevicePixelRatio}&w=${this.mainvisualWidth}`
        this.descriptionImageWidth = 390
      } else {
        this.imageDevicePixelRatio = 2
        this.mainvisualWidth = 1405
        this.initMainvisualPath = `${this.init_mainvisual.url}?dpr=${this.imageDevicePixelRatio}&w=${this.mainvisualWidth}`
        this.mainvisualPath = `${this.mainvisual.url}?dpr=${this.imageDevicePixelRatio}&w=${this.mainvisualWidth}`
        this.descriptionImageWidth = 713
      }
    },
    methods: {
      onLoad() {
        this.isLoaded = true
        this.$nuxt.$emit('onLoad', this.isLoaded)
      }
    }
  }
</script>

<style lang="scss" scoped>
  $mainvisualAnimationStartDelay: 0s;
  .mainvisual {
    width: 100%;
    height: 65vw;
    background: $gradient_primary;
    padding: 10px;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 0;
    @media (max-width: 999px) {
      padding: 5px;
    }
    @media (max-width: 767px) {
      height: 140vw;
    }
    @media (min-width: 1440px) {
      height: 95vh;
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    // &__category {
    //   width: 60%;
    //   color: $color_lightGray;
    //   font-family: $fontFamily_english;
    //   font-size: 6vw;
    //   font-weight: 100;
    //   line-height: 1;
    //   text-align: right;
    //   mix-blend-mode: exclusion;
    //   position: absolute;
    //   right: 100vw;
    //   top: 0vw;
    //   z-index: 2;
    //   opacity: 0;
    //   transform: translateY(5vw) rotate(-90deg);
    //   transform-origin: 100% 0%;
    //   transition: 1s $mainvisualAnimationStartDelay + 1s;
    //   @media (max-width: 767px) {
    //     width: 90%;
    //     font-size: 9vw;
    //   }
    //   &.jsAnimation {
    //     opacity: 1;
    //     transform: translateY(0vw) rotate(-90deg);
    //   }
    // }
    &__catch {
      width: calc(100% - 300px);
      color: $color_lightGray;
      font-family: $fontFamily_english;
      font-size: 2.4vw;
      line-height: 1;
      letter-spacing: -0.5em;
      mix-blend-mode: exclusion;
      position: absolute;
      left: 3vw;
      z-index: 2;
      opacity: 0;
      transform-origin: 100% 0%;
      transition: 1s $mainvisualAnimationStartDelay;
      @media (max-width: 767px) {
        left: 4vw;
      }
      &--row1 {
        top: 3vw;
        @media (max-width: 767px) {
          top: 12vw;
        }
      }
      &--row2 {
        top: 6vw;
        @media (max-width: 767px) {
          top: 20vw;
        }
      }
      @media (max-width: 767px) {
        width: calc(100% - 120px);
        font-size: 4.5vw;
      }
      &.jsAnimation {
        letter-spacing: 0.2em;
        opacity: 1;
      }
    }
    &__title {
      width: 100%;
      color: $color_lightGray;
      font-family: $fontFamily_english;
      font-size: 6vw;
      font-weight: 300;
      line-height: 1;
      text-align: right;
      mix-blend-mode: exclusion;
      position: absolute;
      right: 0vw;
      bottom: 0vw;
      z-index: 2;
      opacity: 0;
      transform: scaleY(0);
      transform-origin: 0% 100%;
      transition: 1s $mainvisualAnimationStartDelay + 0.5s;
      @media (max-width: 767px) {
        font-size: 10.4vw;
      }
      &.jsAnimation {
        opacity: 1;
        transform: scaleY(1);
      }
    }
    &__titleInner {
      display: inline-block;
    }
    &__since {
      color: $color_lightGray;
      font-family: $fontFamily_english;
      font-size: 1.6vw;
      font-weight: 100;
      letter-spacing: 0.1em;
      position: absolute;
      right: 0px;
      bottom: -2vw;
      z-index: 1;
      opacity: 0;
      transform: scaleY(0);
      transform-origin: 0% 100%;
      transition: 1s $mainvisualAnimationStartDelay + 1s;
      @media (max-width: 767px) {
        font-size: 3.4vw;
        bottom: -6vw;
      }
      &.jsAnimation {
        opacity: 1;
        transform: scaleY(1);
      }
    }
  }
  .initMainvisual {
    &__wrapper {
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      background-color: #000000;
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 1;
      opacity: 1;
      transition: 2s $mainvisualAnimationStartDelay + 2.5s;
      @media (max-width: 999px) {
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        left: 5px;
        top: 5px;
      }
      &.jsAnimation {
        opacity: 0;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .contentsBody {
    background-color: $color_middleGray;
    margin-top: 70vw;
    margin-bottom: -300px;
    padding-top: 5vw;
    padding-bottom: 300px;
    position: relative;
    @media (max-width: 767px) {
      margin-top: 150vw;
      margin-bottom: -200px;
      padding-top: 10vw;
      padding-bottom: 200px;
    }
    @media (min-width: 1440px) {
      margin-top: 100vh;
    }
  }
  .scrollIcon {
    width: 1px;
    height: 7vw;
    position: absolute;
    left: 50%;
    top: -5vw;
    z-index: 1;
    transform: translateX(-50%);
    overflow: hidden;
    opacity: 0;
    transition: 1s $mainvisualAnimationStartDelay + 2.5s;
    @media (max-width: 767px) {
      height: 15vw;
      top: -10vw;
    }
    @media (min-width: 1440px) {
      top: -5vh;
    }
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(222,222,222,0.6);
      display: block;
      animation: 2s scrollIconBorder infinite;
    }
    @keyframes scrollIconBorder {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }
    &.jsAnimation {
      opacity: 1;
    }
  }
  .description {
    max-width: 1600px;
    margin: 0px auto;
    &__title {
      @include sectionTitle;
      font-family: $fontFamily_japanese;
      font-size: 2.6rem;
      line-height: 1.8;
      @media (max-width: 999px) {
        font-size: 1.6rem;
      }
    }
    &__body {
      height: 50vw;
      display: flex;
      justify-content: space-between;
      @media (min-width: 1601px) {
        height: 800px;
      }
      @media (max-width: 767px) {
        height: auto;
        margin-bottom: 60px;
        display: block;
        &:last-child {
          margin-bottom: 0px;
        }
      }
      &:nth-child(2n) {
        flex-direction: row-reverse;
      }
    }
    &__imageBox {
      width: 50%;
      background-color: #000000;
      position: relative;
      @media (max-width: 767px) {
        width: 100%;
        height: 100vw;
        margin-bottom: 0px;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      z-index: 1;
    }
    &__leadBox {
      width: 50%;
      background-color: $color_darkGray;
      display: flex;
      align-items: center;
      @media (max-width: 767px) {
        width: 85%;
        background-color: transparent;
        border-width: 1px 0px 1px 0px;
        border-style: solid;
        border-color: rgba(222,222,222,0.6);
        margin: -10px auto 0px;
        padding: 20px 0px;
        position: relative;
        z-index: 1;
        transform: translateZ(1px);
        &:before,
        &:after {
          content: "";
          width: 1px;
          height: calc(100% - 30px);
          background-color: rgba(222,222,222,0.6);
          position: absolute;
          top: 15px;
          z-index: 1;
        }
        &:before {
          left: -15px;
        }
        &:after {
          right: -15px;
        }
      }
      /deep/ p {
        width: 100%;
        color: $color_lightGray !important;
        font-size: 1.8rem;
        font-weight: normal;
        line-height: 2.2;
        letter-spacing: 0.2em;
        text-align: center !important;
        @media (max-width: 999px) {
          font-size: 1.3rem;
          letter-spacing: 0.15em;
          text-align: center !important;
        }
      }
    }
  }
  .js-contentsBody {
    opacity: 0;
    transform: translateY(50px);
    transition: 1s $mainvisualAnimationStartDelay + 2.5s;
    &.jsAnimation {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  .movie {
    max-width: 1600px;
    margin: 0px auto -50px;
    padding: 150px 10px 0px;
    @media (max-width: 999px) {
      margin-bottom: -20px;
      padding-top: 80px;
    }
    &__title {
      @include sectionTitle;
    }
    &__list {
      list-style-type: none;
      margin-bottom: -10px;
      padding: 0px;
      display: flex;
      flex-wrap: wrap;
    }
    &__item {
      width: calc(50% - 5px);
      background-color: #000000;
      margin-right: 10px;
      margin-bottom: 10px;
      padding-bottom: 30%;
      position: relative;
      @media (max-width: 767px) {
        width: 100%;
        margin-right: 0%;
        padding-bottom: 60%;
      }
      &:nth-child(2n) {
        margin-right: 0%;
      }
    }
    &__iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 1;
    }
  }
</style>