<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
        <q-card id="profile-header">
            <h3> {{$auth.user.name}} </h3>
            <q-avatar @click="uploadPic">
              <q-img :src="$auth.user.picture" />
            </q-avatar>

          <q-tabs v-model="tab" dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator class="text-grey">
              <q-tab name="details" label="details">
              </q-tab>
              <q-tab name="colllection" label="COllection">
              </q-tab>
          </q-tabs>
        
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="details">
              <user-details></user-details>
            </q-tab-panel>
            <q-tab-panel name="collection">
              <Collection></Collection>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
    </div>
  </div>
</template>

<script>
import Collection from "../components/Collection";
import UserDetails from '@/components/UserDetails.vue';
export default {
  name: 'Profile',
  components: {
     Collection,
     UserDetails
  }
}
</script>