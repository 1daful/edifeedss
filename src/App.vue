<template>
  <q-layout view="lHh Lpr lFf">
    <div> {{site.title}} </div>
    <SiteHeader v-if="site.data" :site="site.data"></SiteHeader>

    <!--<SiteNav></SiteNav>-->

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>

import SiteHeader from "./components/SiteHeader";
//import SiteNav from "./components/SiteNav";

import { Axiosi } from "./api/Axiosi";

const axiosi = new Axiosi();
let site = {}

export default {
  name: 'LayoutDefault',
  data() {
    return {
      site
    }
  },
  components: {
    SiteHeader,
    //SiteNav
  },
  mounted() {
    axiosi.load('./config.json').then(site => {
      this.site = site
    })
  }
}
</script>
