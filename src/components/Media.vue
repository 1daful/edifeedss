<template>
    <div>
        <q-toolbar>
            <q-toolbar-title>
                {{media.type}}
            </q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md">
            <div class="row media">
                <q-list>
                    <q-item class="col-sm-4" v-for="mediaItem in media.mediaItems" :key="mediaItem.title">
                    <!--<router-link :to="{name: SinglePageMedia, params: {title: mediaItem.title, db: this.db, auth: this.db, FB: this.FB}}">-->
                        <q-img :src="mediaItem.thumbnail" spinner-color="white" class="med-img" style="height: 140px; max-width: 150px">
                            <template v-slot:error>
                                <div class="absolute-full flex flex-cnter bg-negative text-white">
                                <q-icon name="error" /> Cannot load image
                                </div>
                            </template>
                        </q-img>
                        <q-item-label>{{mediaItem.title}}</q-item-label>
                        <q-icon name="schedule" />{{mediaItem.timestamp}}
                        <!--<b-button @click="addToCollection">
                            <b-icon :icon="collIcon">
                            </b-icon>
                        </b-button>-->
                        <!--<b-button @click="addToFavourites">
                            <b-icon :icon="favIcon">
                            </b-icon>
                        </b-button>-->
                    <!--</router-link>-->
                    </q-item>
                </q-list>
            </div>
        </div>
  <!--<router-link :to="{name: MediaList, params: {type: mediaItem.type}}"><p>See more</p></router-link>-->
</div>
</template>

<script>
export default {
    name: 'Media',
    props: {
      media: {
          type: Object,
          required: true
      }/*,
      db: {
          type: Object,
          required: true
      },
      auth: {
          type: Object,
          required: true
      }*/
  },
  /*methods: {
      addToCollection() {
          if (this.firAuth.currentUser) {
              this.repository.setItem(this.media.type, this.media);
              this.icon = 'plus-square-fill'
          }
          else {
              this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
          }
      },
      addToFavourites() {
          if (this.firAuth.currentUser) {
              let subPath = `${this.media.type}/${this.media.id}/favourites`;
              let item = {id: this.firAuth.currentUser};
              this.repository.setChild(subPath, item);
              this.icon = 'heart-fill'
          }
          else {
              this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
          }
      }
  }*/
}
</script>