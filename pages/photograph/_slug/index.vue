<template>
  <main class="mainContents">
    <sectionsPhotoPreview
      sectionName="photograph"
      :photo="photo"
      :prevPhotoId="prevPhotoId"
      :nextPhotoId="nextPhotoId"
      :listNumber="listNumber"
      />
  </main>
</template>

<script>
  import axios from 'axios'
  import { createClient } from 'microcms-js-sdk';
  export default {
    layout: 'no-page-loader',
    async asyncData({ params }) {
      const { data } = await axios.get(
        `https://mine.microcms.io/api/v1/photo/${params.slug}`,
        {
          headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' }
        }
      )
      return data
    },
    async fetch() {
      const client = createClient({
        serviceDomain: 'mine',
        apiKey: '777407c0-ad7a-4703-a5dc-4a999f7ccddc',
        retry: true
      })
      const { contents } = await client
        .get({
          endpoint: 'photo',
          queries: {limit: 1000, fields: 'id', orders: 'publishedAt', filters: 'category[contains]photograph'}
        })
      const contentsLength = contents.length
      const index = contents.findIndex((content) => content.id === this.id)
      const prevIndex = index - 1
      const nextIndex = index + 1

      if(prevIndex >= 0) {
        this.prevPhotoId = contents[prevIndex].id
      }

      if(nextIndex < contentsLength) {
        this.nextPhotoId = contents[nextIndex].id
      }
    },
    head(){
      return {
        title: 'photograph | mine',
        meta: [
          { hid: 'description', name: 'description', content: 'ミラーレス一眼で撮った写真' },
          { hid: 'og:type', property: 'og:type', content: 'article' },
          { hid: 'og:title', property: 'og:title', content: `photograph | mine` },
          { hid: 'og:description', property: 'og:description', content: 'ミラーレス一眼で撮った写真' },
          { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` },
          { hid: 'og:image', property: 'og:image', content: this.photo.url }
        ]
      }
    },
    data() {
      return {
        prevPhotoId: null,
        nextPhotoId: null,
        listNumber: null
      }
    },
    mounted() {
      this.listNumber = !this.$route.query.list ? '1' : this.$route.query.list
    }
  }
</script>