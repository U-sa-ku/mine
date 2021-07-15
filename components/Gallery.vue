<template>
  <section class="gallery">
    <h2 class="gallery__title">gallery</h2>
    <ul class="gallery__list">
      <li
        class="gallery__listItem"
        v-for="photo in gallery.contents"
        :key="gallery.id"
      >
        <img
          :src="`${photo.photo.url}?dpr=2&w=760&q=90`"
          alt=""
          class="gallery__image"
        > 
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  async fetch() {
    this.gallery = await fetch(
      `https://mine.microcms.io/api/v1/gallery?limit=20${this.category === undefined ? '' : `&filters=category[equals]${this.category}`}`,
      { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
    ).then(res => res.json())
  },
  data() {
    return {
      gallery: [],
      isShow: false
    }
  },
  props: {
    category: undefined
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  padding: 10vw 0vw;
  @media (max-width: 767px) {
    padding: 15vw 0vw;
  }
  &__title {
    @include sectionTitle;
  }
  &__list {
    list-style-type: none;
    background: #000000;
    padding: 10px;
    column-count: 3;
    column-gap: 10px;
    @media (max-width: 999px) {
      column-count: 2;
    }
    @media (max-width: 767px) {
      padding-bottom: 0px;
      column-count: 1;
    }
  }
  &__listItem {
    margin-bottom: 10px;
  }
}
</style>
