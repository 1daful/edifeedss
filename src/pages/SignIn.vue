<template>
    <div :bgImg="bgImg" class="q-pa-md" :style="{background: url(bgImg)}">
        <div v-for="social in socials" :key="social.id">
            <q-btn :label="`Sign in with ${social.name}`" color="primary"/> 
        </div>
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="user.email" type="email" label="Email" />
            <q-input v-model="user.password" type="password" label="Password" />
            <router-link to="/password-recovery">Forget password?</router-link>
            <q-btn label="Sign in" type="submit" color="primary"></q-btn>
        </q-form>
        <p>Don't have an account? <router-link to="/sign-up">Sign up</router-link></p>
    </div>
</template>

<script>
import { FirebaseAuth } from "../api/auth/FirebaseAuth";

let auth = new FirebaseAuth()

export default {
    name: 'SignIn',
    data() {
        return {
            socials,
            user: {   
                email: '',
                password: ''
            }
        }
    },
    props: {
        url: {
            type: String,
            required: true
        },
        /*login: {
            type: Boolean,
            required: true
        }*/
    },
    methods: {
        onSubmit() {
            auth.logIn()
            auth.getUser().then(() => {
                this.$router.push({path: url})
            });
        }      
    },
    mounted() {
        
    }
}
</script>