<template>
    <div :mediaItems="mediaItems">
        <ul class="nav nav-pills nav-stacked">
            <li class="nav-item" v-for="mediaItem in mediaItems" :key="mediaItem.id">
                <a class="flex-sm-fill text-sm-center nav-link" :href="mediaItem.title" data-toggle="pill">
                    {{mediaItem.title}}
                </a>
            </li>
        </ul>
    </div>

    <q-splitter v-model="splitterModel" style="height: 250px">
        <template v-slot:before>
            <q-tabs v-model="tab" vertical dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator class="text-grey">
                <q-tab v-for="mediaItem in mediaItems" :key="mediaItem.id" :name="mediaItem.title" :label="mediaItem.title">
                </q-tab>
            </q-tabs>
        </template>
            
        <template v-slot:after>
            <q-tab-panels vertical swipeable transition-prev="jump-up" transition-next="jump-up" v-model="tab" animated>
                <q-tab-panel v-for="mediaItem in mediaItems" :key="mediaItem.id" :name="mediaItem.title">
                    {{mediaItem.title}}
                </q-tab-panel>
            </q-tab-panels>
        </template>
    </q-splitter>
</template>
<script>
import { Repository } from "../model/Repository";
import {  } from "./MediaComponent";

let repository = new Repository('collection');
export default {
    name: 'Collection',
    data() {
        return {
            repository,
            mediaItems: repository.readItems('collection', )
        }
    },
    /*props: {
        mediaItems: Array
    }*/
}
</script>