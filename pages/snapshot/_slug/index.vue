<template>
  <main class="mainContents">
    <sectionsPhotoPreview
      sectionName="snapshot"
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
      // const prevPhotoRespons = await fetch(
      //   `https://mine.microcms.io/api/v1/photo?limit=10&fields=id&orders=-publishedAt&filters=category[contains]snapshot[and]publishedAt[less_than]${this.publishedAt}`,
      //   { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      // ).then(res => res.json())

      // const nextPhotoRespons = await fetch(
      //   `https://mine.microcms.io/api/v1/photo?limit=10&fields=id&orders=publishedAt&filters=category[contains]snapshot[and]publishedAt[greater_than]${this.publishedAt}`,
      //   { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      // ).then(res => res.json())

      // if(prevPhotoRespons.contents.length != 0) {
      //   this.prevPhotoId = prevPhotoRespons.contents[0].id
      //   this.isShowPrevPhoto = true
      // }

      // if(nextPhotoRespons.contents.length != 0) {
      //   this.nextPhotoId = nextPhotoRespons.contents[0].id
      //   this.isShowNextPhoto = true
      // }

      const client = createClient({
        serviceDomain: 'mine',
        apiKey: '777407c0-ad7a-4703-a5dc-4a999f7ccddc',
        retry: true
      })
      const { contents } = await client
        .get({
          endpoint: 'photo',
          queries: {limit: 1000, fields: 'id', orders: 'publishedAt', filters: 'category[contains]snapshot'}
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
        title: 'snapshot | mine',
        meta: [
          { hid: 'description', name: 'description', content: 'iPhoneで撮った写真' },
          { hid: 'og:type', property: 'og:type', content: 'article' },
          { hid: 'og:title', property: 'og:title', content: `snapshot | mine` },
          { hid: 'og:description', property: 'og:description', content: 'iPhoneで撮った写真' },
          { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` }
        ]
      }
    },
    data() {
      return {
        contents: this.contents,
        isLoaded: false,
        prevPhotoId: this.prevPhoto,
        isShowPrevPhoto: false,
        nextPhotoId: this.nextPhoto,
        isShowNextPhoto: false,
        listNumber: null
      }
    },
    mounted() {
      this.listNumber = !this.$route.query.list ? '1' : this.$route.query.list
    }
  }
</script>