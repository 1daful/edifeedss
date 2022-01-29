<template>
    <section v-if="quote" class="row"  id="qod">
        <q-img :src="quote.thumbnail" spinner-color="whitesmoke" class="rounded-borders col-6">
            <q-item-label class="absolute-full text-subtitle2 flex flex-center">{{quote.description}}</q-item-label>
            <q-icon name="format_quote"></q-icon>
        </q-img>
        <q-avatar size="100px">
            <q-img :src="quote.thumbnail" spinner-color="whitesmoke" class="col-6" />
        </q-avatar>
    </section>
</template>

<script lang="ts">
import { QuoteMedia } from "../media/QuoteMedia";

import { defineComponent } from 'vue';

let quoteMedia = new QuoteMedia();
let quote: any
export default defineComponent ({
    name: 'QOD',
    data() {
        return{
            quote
        }
    },
    /*computed: {
          icon() {
            let routes = this.$router.options.routes;
              let ics = [];
              for (const route of routes) {
                  if(route.navigational&&route.icon) {
                      ics.push(route);
                  }
              }
              return ics
          },
          bgImg() {
            let url = this.site.header.bgImg;
            return url
          }
      },*/
      async mounted() {
          await quoteMedia.getMedia()
          const f = await quoteMedia.readMedia()
          const q = JSON.parse(JSON.stringify(f))
          const p = q[0]
          //const t = JSON.parse(JSON.stringify(p))
          this.quote = p.data;
          console.log("In QOD: ", this.quote)
      },
      /*props: {
          bgImg: {
              type: String,
              required: true
          }
      }*/
})
</script>