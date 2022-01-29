<template>
    <div class="container">
    <div class="row">
        <div class="col-sm-8">
            <q-img :src="media.thumbnail"></q-img>
            <h4>
                {{media.title}}
            </h4>
            <q-avatar>
                <img :src="author.pic" />
            </q-avatar>
            <span>
                <q-icon name="watch_later"></q-icon>
                {{media.created}}
            </span>
            <q-btn :disable="isDisabled" @click="addToCollection">
                <q-icon :name="collIcon">
                </q-icon>
            </q-btn>
            <!--<b-button @click="addToFavourites">
                <b-icon :icon="favIcon">
                </b-icon>
                <b-badge>{{media.count}} </b-badge>
            </b-button>
            <b-button><b-icon-chat-fill></b-icon-chat-fill><b-badge> {{comment.count}} </b-badge></b-button>-->
            <div>
                {{media.description}}
            </div>

            <!-- share -->
            <div>
                <button @click="facebook"><q-icon name="facebook"></q-icon>
                    facebook
                </button>
                <span><q-icon name="twitter"></q-icon>
                    <a class="twitter-share-button" href="https://twitter.com/intent/tweet"></a>
                </span>
                <span><q-icon class="pinterest"></q-icon> 
                    <a href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonBookmark" :data-pin-id="media.thumbnail"></a>
                </span>
            </div>
        </div>
        <div class="col-sm-4">
            <div>
                <h4>
                    Tags
                </h4>
                <p id="books-tags">
                    <span v-for="tag in media.tags" :key="tag">
                        <q-icon name="label"></q-icon>{{tag}}
                    </span>
                </p>
            </div>
            <hr />
            <MediaComponent :pos="pos"></MediaComponent>
        </div>
    </div>
</div>
</template>

<script>
import { Repository } from "../model/Repository";
import MediaComponent from "../components/MediaComponent"

let repository = new Repository();

export default {
    name: 'SingleMediaPage',
    data() {
        return {
            pos: "sidebar",
            repository,
            collIcon: 'library_add',
            isDisabled: false
            //favIcon: 'hearth',
            //path: `${this.media.type}/${this.media.id}/comments`
        }
    },
    props: {
        media: {
            type: Object,
            required: true
        },
        /*db: {
            type: Object,
            required: true
        },
        auth: {
            type: Object,
            required: true
        },*/
        FB: {
            type: Object,
            required: true
        },
    },
    components: {
        MediaComponent
    },
    methods: {
        facebook() {
            this.FB.ui({
                method: 'share',
                href: this.$route.path
            }, function(response) {
                if (response && !response.error) {
                    alert('Post shared successfully!');
                }
            })
        },
        addToCollection() {
            if (this.currentUser) {
                this.repository.addItem(this.media.type, this.media);
                this.icon = 'library_add_check',
                this.isDisabled = true
            }
            else {
                this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
            }
        }
        /*addToFavourites() {
            if (this.firAuth.currentUser) {
                let subPath = `${this.media.type}/${this.media.id}/favourites`;
                let item = {id: this.firAuth.currentUser};
                this.repository.setChild(subPath, item);
                this.icon = 'heart-fill'
            }
            else {
                this.$router.push({path: '/sign-in', params: {msg: 'You must login first'}});
            }
        }*/
    }
}
</script>