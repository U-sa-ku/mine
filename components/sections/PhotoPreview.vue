<template>
  <section class="photoPreview">
    <div class="photoPreview__stage">
      <h1
        class="photoPreview__imageWrapper"
        v-touch:swipe.right="linkToPrev"
        v-touch:swipe.left="linkToNext"
        v-touch:moving="swipingImage('param')"
        v-touch:end="swipedImage('param')"
        >
        <picture>
          <source :srcset="`${photo.url}?dpr=${imageDevicePixelRatio}&w=${imageWidth}&q=${imageQuality}&fm=webp`" type="image/webp"/>
          <img
            :src="`${photo.url}?dpr=${imageDevicePixelRatio}&w=${imageWidth}&q=${imageQuality}`"
            alt="Photo Preview"
            class="photoPreview__image lazyload lazyloadImage"
            >
        </picture>
        <ElementsImageLoader/>
      </h1>
    </div>
    <nav class="photoPreviewNavigation">
      <div class="photoPreviewNavigation__inner">
        <nuxt-link
          :to="`/${sectionName}/${prevPhotoId}/?list=${listNumber}`"
          v-if="prevPhotoId"
          class="photoPreviewNavigation__link photoPreviewNavigation__link--prev"
          >
          <span class="photoPreviewNavigation__caption">prev</span>
        </nuxt-link>
        <nuxt-link
          :to="`/${sectionName}/page/${listNumber}/`"
          class="photoPreviewNavigation__link photoPreviewNavigation__link--list"
          >
          <span class="photoPreviewNavigation__listIcon">
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
            <i class="photoPreviewNavigation__listIconSquare"></i>
          </span>
        </nuxt-link>
        <nuxt-link
          :to="`/${sectionName}/${nextPhotoId}/?list=${listNumber}`"
          v-if="nextPhotoId"
          class="photoPreviewNavigation__link photoPreviewNavigation__link--next"
          >
          <span class="photoPreviewNavigation__caption">next</span>
        </nuxt-link>
      </div>
    </nav>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        isLoaded: false,
        imageDevicePixelRatio: null,
        imageWidth: null,
        imageQuality: 80
      }
    },
    props: {
      sectionName: undefined,
      photo: null,
      prevPhotoId: null,
      nextPhotoId: null,
      listNumber: null
    },
    mounted() {
      this.$nuxt.$emit('initShowSiteHeader')

      if(window.innerWidth <= 767) {
        this.imageDevicePixelRatio = 3
        this.imageWidth = 390
      } else {
        this.imageDevicePixelRatio = 2
        this.imageWidth = 1440
      }
    },
    methods: {
      linkToPrev() {
        if(this.prevPhotoId) {
          this.$router.push(`/${this.sectionName}/${this.prevPhotoId}/?list=${this.listNumber}`)
        }
      },
      linkToNext() {
        if(this.nextPhotoId) {
          this.$router.push(`/${this.sectionName}/${this.nextPhotoId}/?list=${this.listNumber}`)
        }
      },
      swipingImage(param) {
        let temporaryScreenX

        return function(direction, event) {
          const eventType = direction.type
          const target = direction.target
          let currentScreenX
          let offsetX

          switch(eventType) {
            case 'mousemove':
              currentScreenX = direction.screenX
              break
            case 'touchmove':
              currentScreenX = direction.touches[0].screenX
              break
          }

          if(!temporaryScreenX) {
            temporaryScreenX = currentScreenX
          }

          offsetX = currentScreenX - temporaryScreenX
          target.style.webkitTransform = `translateX(${offsetX}px)`
        }
      },
      swipedImage(param) {
        return function(direction, event) {
          direction.target.style.webkitTransform = 'translateX(0px)'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .photoPreview {
    &__stage {
      height: calc(100vh - 200px);
      background-color: #000000;
      margin-top: 70px;
      margin-bottom: 15px;
      @media (max-width: 999px) {
        height: calc(100vh - 130px);
        height: calc(100dvh - 130px);
        margin-top: 40px;
        margin-bottom: 10px;
      }
    }
    &__imageWrapper {
      width: 100%;
      height: 100%;
      position: relative;
      @media (min-width: 1000px) {
        transform: translateX(0px) !important;
      }
      @media (max-width: 999px) {
        transition: 0.1s;
      }
    }
    &__image {
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate3d(-50%, -50%, 1px);
      pointer-events: none;
    }
  }
  .photoPreviewNavigation {
    max-width: 1280px;
    margin: 0px auto;
    padding: 0px 30px;
    @media (max-width: 767px) {
      padding: 0px 15px;
    }
    &__inner {
      width: 24px;
      margin: 0px auto;
      position: relative;
      @media (min-width: 768px) {
        padding-top: 60px;
      }
    }
    &__link {
      color: inherit;
      font-size: 1.8rem;
      text-decoration: none;
      letter-spacing: 0.1em;
      display: block;
      position: absolute;
      z-index: 1;
      &--prev,
      &--next {
        width: 110px;
        top: 0px;
        @media (max-width: 999px) {
          width: 90px;
          font-size: 1.4rem;
        }
        &:before {
          content: "";
          width: 100%;
          height: 15px;
          border-style: solid;
          border-color: $color_lightGray;
          display: block;
          position: absolute;
          bottom: -5px;
          z-index: 0;
          transition: 0.3s;
        }
        @media (min-width: 769px) {
          &:hover:before {
            transform: translateX(10px) skewX(45deg);
          }
        }
      }
      &--prev {
        padding-left: 30px;
        right: 70px;
        @media (max-width: 999px) {
          right: 45px;
        }
        &:before {
          border-width: 0px 0px 1px 1.5px;
          left: 0px;
          transform-origin: 0% 100%;
          transform: skewX(-45deg);
        }
        @media (min-width: 769px) {
          &:hover:before {
            transform: translateX(-10px) skewX(-45deg) !important;
          }
        }
      }
      &--next {
        text-align: right;
        padding-right: 30px;
        left: 70px;
        @media (max-width: 999px) {
          left: 45px;
        }
        &:before {
          border-width: 0px 1.5px 1px 0px;
          transform-origin: 1000% 100%;
          transform: skewX(45deg);
          right: 0px;
        }
      }
      &--list {
        position: absolute;
        left: 50%;
        top: 5px;
        z-index: 1;
        transform: translateX(-50%);
      }
    }
    &__caption {
      font-family: $fontFamily_english;
    }
    &__listIcon {
      width: 30px;
      height: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 5px;
      @media (max-width: 999px) {
        width: 24px;
        height: 24px;
        gap: 4px;
      }
      @media (min-width: 769px) {
        transition: 0.3s;
        &:hover {
          gap: 3px;
        }
      }
    }
    &__listIconSquare {
      background-color: $color_lightGray;
    }
  }
</style>
