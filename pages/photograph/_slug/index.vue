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
  //import axios from 'axios'
  import { createClient } from 'microcms-js-sdk'
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
      //   `https://mine.microcms.io/api/v1/photo?limit=1&fields=id&orders=-publishedAt&filters=category[contains]photograph[and]publishedAt[less_than]${this.publishedAt}`,
      //   { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      // ).then(res => res.json())

      // const nextPhotoRespons = await fetch(
      //   `https://mine.microcms.io/api/v1/photo?limit=1&fields=id&orders=publishedAt&filters=category[contains]photograph[and]publishedAt[greater_than]${this.publishedAt}`,
      //   { headers: { 'X-API-KEY': '777407c0-ad7a-4703-a5dc-4a999f7ccddc' } }
      // ).then(res => res.json())

      const client = createClient({
        serviceDomain: "mine",
        apiKey: "777407c0-ad7a-4703-a5dc-4a999f7ccddc",
        retry: true
      })

      client.get({
          endpoint: 'photo',
          queries: {
            limit: 1,
            fields: 'id',
            orders: '-publishedAt',
            filters: `category[contains]photograph[and]publishedAt[less_than]${this.publishedAt}`
          }
        })
        .then((res) => {
          const prevPhotoRespons = res
        })
        .catch((err) => console.error(err))

      client.get({
          endpoint: 'photo',
          queries: {
            limit: 1,
            fields: 'id',
            orders: 'publishedAt',
            filters: `category[contains]photograph[and]publishedAt[less_than]${this.publishedAt}`
          }
        })
        .then((res) => {
          const nextPhotoRespons = res
        })
        .catch((err) => console.error(err))

      if(prevPhotoRespons.contents.length != 0) {
        this.prevPhotoId = prevPhotoRespons.contents[0].id
      }

      if(nextPhotoRespons.contents.length != 0) {
        this.nextPhotoId = nextPhotoRespons.contents[0].id
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
          { hid: 'og:url', property: 'og:url', content: `https://mine-u-saku.netlify.app${this.$route.fullPath}` }
        ]
      }
    },
    data() {
      return {
        contents: this.contents,
        isLoaded: false,
        prevPhotoId: this.prevPhoto,
        nextPhotoId: this.nextPhoto,
        listNumber: null
      }
    },
    mounted() {
      this.listNumber = !this.$route.query.list ? '1' : this.$route.query.list
    }
  }
</script>