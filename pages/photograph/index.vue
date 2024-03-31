<template>
  <main class="mainContents">
    <sectionsPhotoList
      sectionName="photograph"
      :photos="contents"
      :photosLimit="photographLimit"
      :paginationLength="paginationLength"
      :currentPage="currentPage"
      @onLoad="onLoad"
      />
    <div :class="['standaloneContent', 'js-contentsBody', {jsAnimation:isLoaded}]">
      <sectionsPhotoSlider
        sectionName="snapshot"
        :photos="snapshots"
        />
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
  export default {
    async asyncData({ params }) {
      const page = params.p || '1'
      const photographLimit = 24
      const { data } = await axios.get(
        `https://mine.microcms.io/api/v1/photo?limit=${photographLimit}&filters=category[contains]photograph&orders=-publishedAt&offset=${(page - 1) * photographLimit}`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      )
      return data
    },
    async fetch() {
      const snapshotLimit = 10
      this.snapshots = await fetch(
        `https://mine.microcms.io/api/v1/photo?limit=${snapshotLimit}&filters=category[contains]snapshot`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      ).then(res => res.json())
    },
    head(){
      return {
        title: 'photograph | mine',
        meta: [
          { hid: 'description', name: 'description', content: 'ミラーレス一眼で撮った写真リスト' },
          { hid: 'og:type', property: 'og:type', content: 'article' },
          { hid: 'og:title', property: 'og:title', content: `photograph | mine` },
          { hid: 'og:description', property: 'og:description', content: 'ミラーレス一眼で撮った写真リスト' },
          { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` }
        ]
      }
    },
    data() {
      return {
        isLoaded: false,
        photographLimit: 24,
        paginationLength: null,
        currentPage: null,
        snapshots: []
      }
    },
    mounted() {
      this.paginationLength = Math.ceil(this.totalCount / this.photographLimit)
      this.currentPage = !this.$route.params.p ? '1' : this.$route.params.p
    },
    methods: {
      onLoad(isLoaded) {
        this.isLoaded = isLoaded
        this.$nuxt.$emit('onLoad', this.isLoaded)
        this.$nuxt.$emit('initShowSiteHeader')
      }
    }
  }
</script>

<style lang="scss" scoped>
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