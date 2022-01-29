<template>
    <div :section= "section">
        <div class="q-pa-md">
                <h3>
                    {{section.title}}
                </h3>
                <Media v-for="media in section.mediaList" :key="media.type" :media="media"></Media>
        </div>
    </div>
</template>

<script>
import Media from './Media';
export default {
    name: 'Section',
    props: {
        section: {
            type: Object,
            required: true
        }
    },
    components: {
        Media
    }
}
</script>