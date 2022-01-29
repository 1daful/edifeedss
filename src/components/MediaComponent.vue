<template>
  <div class="q-pa-md media">
    <Section v-for="section in sections" :key="section.id" :section="section">
    </Section>
  </div>
</template>

<script>
import Section from "../components/Section";
import { Recommender } from '../api/Recommender';

let recommender = new Recommender();

export default {
  name: 'MediaComponent',
  props: {
    pos: {
      type: String,
      required: true
    }
  },
    computed: {
      sections() {
        let sections = [
          {
              name: 'recommended',
              mediaList: [],
              pos: 'main'
          },
          {
              name: 'top',
              mediaList: [],
              pos: 'main'
          },
          {
              name: 'ever-green',
              mediaList: [],
              pos: 'main'
          },
          {
            name: 'related',
            mediaList: [],
            pos: 'sidebar'
          },
          {
            name: 'sameAuthor',
            mediaList: [],
            pos: 'sidebar'
          },
          {
            name: 'top',
            mediaList: [],
            pos: 'sidebar' 
          },
        ];
    
    for (const section of sections) {
      section.id = section.pos + section.name
      if (this.pos == "main" && section.pos =="main") {
        section.mediaList = recommender.getMedia(section.name);
      }
      else if (this.pos == "sidebar" && section.pos == "sidebar") {
        section.mediaList = recommender.getMedia(section.name)
      }
    }
    return sections;
      }
    },
    components: {
      Section
    }
}
</script>