<template>
  <section class="photogragh">
    <h2 class="photogragh__title">photogragh</h2>
    <ul class="photogragh__list">
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
    </ul>
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
      isShow: false
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
