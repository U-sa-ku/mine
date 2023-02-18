<template>
  <main class="mainContents">
    <sectionsPhotoList
      sectionName="snapshot"
      :photos="contents"
      :photosLimit="snapshotLimit"
      :paginationLength="paginationLength"
      :currentPage="currentPage"
      @onLoad="onLoad"
      />
    <div :class="['standaloneContent', 'js-contentsBody', {jsAnimation:isLoaded}]">
      <sectionsPhotoSlider
        sectionName="photograph"
        :photos="photographs"
        />
    </div>
  </main>
</template>

<script>
  import axios from 'axios'
  export default {
    async asyncData({ params }) {
      const page = params.p || '1'
      const snapshotLimit = 24
      const { data } = await axios.get(
        `https://mine.microcms.io/api/v1/photo?limit=${snapshotLimit}&filters=category[contains]snapshot&orders=-publishedAt&offset=${(page - 1) * snapshotLimit}`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      )
      return data
    },
    async fetch() {
      const photographLimit = 50
      this.photographs = await fetch(
        `https://mine.microcms.io/api/v1/photo?limit=${photographLimit}&filters=category[contains]photograph`,
        { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      ).then(res => res.json())
    },
    head(){
      return {
        title: 'snapshot | mine',
        meta: [
          { hid: 'description', name: 'description', content: 'iPhoneで撮った写真リスト' },
          { hid: 'og:type', property: 'og:type', content: 'article' },
          { hid: 'og:title', property: 'og:title', content: `snapshot | mine` },
          { hid: 'og:description', property: 'og:description', content: 'iPhoneで撮った写真リスト' },
          { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` }
        ]
      }
    },
    data() {
      return {
        isLoaded: false,
        snapshotLimit: 24,
        paginationLength: null,
        currentPage: null,
        photographs: []
      }
    },
    mounted() {
      this.paginationLength = Math.ceil(this.totalCount / this.snapshotLimit)
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