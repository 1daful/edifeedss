<template>
    <div>
    <div>
        <h6>
            What messages do you hear?
        </h6>
        <div>
            <button class="btn" v-for="genre in genres" :key="genre.id" variant="primary" @click="loadMedia(genre.id)">
                {{genre.id}}
            </button>
        </div>
    </div>
</div>
</template>

<script>
import { Metadata } from '../model/metadata'

let metadata = new Metadata();

export default {
    name: 'Genres',
    data() {
        return {
            params: {},
            genres: metadata.loadGenres()
        }
    },
    methods: {
        loadMedia(id) {
            this.$router.push({path: 'topical-index', params: {genre: id}});
        }
    }
}
</script>
