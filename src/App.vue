<template>
  <q-layout view="lHh Lpr lFf">
    <SiteHeader v-if="header" :site="site"></SiteHeader>

    <!--<SiteNav></SiteNav>-->

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>

import SiteHeader from "./components/SiteHeader";
import site from "../public/config.json";
//import SiteNav from "./components/SiteNav";

//import { Axiosi } from "./api/Axiosi";

//const axiosi = new Axiosi();

export default {
  name: 'LayoutDefault',
  data() {
    return {
      site: site
    }
  },
  computed: {
    header() {
      let header = false
      let noHeader = this.$route.meta.noHeader
      if (noHeader){
        return header
      }
      else {
        header = true
      }
      return header
    }
  },
  components: {
    SiteHeader
    //SiteNav
  }/*,
  mounted() {
  }*/
}
</script>