<template>
  <div>
    <div class="home container">
      <div class="row">
        <div class="col-sm-8">
          <SiteHero v-if="site" :site="site"></SiteHero>
          <h4>
            Quote  of the day
          </h4>
          <QOD></QOD>
          <MediaComponent v-if="pos" :pos="pos"></MediaComponent>
          <!--<Newsletter v-if="site" :bgImg="site.newsletter.bgImg"></Newsletter>-->
          <Newsletter></Newsletter>
        </div>
        <div class="col-sm-4">
          <Genres></Genres>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Newsletter from "@/components/Newsletter.vue";
//import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { Axiosi } from "../api/Axiosi";
import SiteHero from "@/components/SiteHero.vue";
import MediaComponent from "../components/MediaComponent.vue";
import QOD from "../components/QOD.vue";
import Genres from "../components/Genres.vue";

let axios = new Axiosi();
let site: Object;
let pos = "main"

export default defineComponent({
  name: 'Home',
  data() {
        return {
            site,
            pos
        }
    },
    components: {
      SiteHero,
      QOD,
      MediaComponent,
      Newsletter,
      Genres
    },
    mounted() {
        axios.load("../config.json").then(resp => {
            if (resp) this.site = resp.data
        })
    }
})
</script>