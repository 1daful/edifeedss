<template>
    <div :bgImg="bgImg" class="q-pa-md" :style="{background: url(bgImg)}">
        <img :src="logo" />
        <div v-for="social in socials" :key="social.id">
            <q-btn :label="`Sign up with ${social.name}`" color="primary"/> 
        </div>
        <FormulteForm @submit="onSubmit" class="q-gutter-md">
            <FormulateInput type="text" name="First name" label="First Name" validation="required" error-behavior="live"/>
            <FormulateInput type="text" name="First name" label="First Name" validation="required" error-behavior="live"/>
            <FormulateInput type="email" name="Email" label="Email" placeholder="yourname@email.com" help="Sample email help text" validation="required|email" error-behavior="live" />
            <!--<q-input v-model="user.email" type="email" label="Email" />-->

            <FormulateInput type="password" name="userPassword" label="Password" 
            help="Sample password help text" validation="required|min:10,length|max:126" 
            validation-name="Password" error-behavior="live" />
            <!--<q-input v-model="user.password" type="password" label="Password" />-->
            <ProgressBar v-if="passwordStrength.show" :meter="passwordStrength"></ProgressBar>
            
            <vue-recaptcha sitekey="" :loadRecaptchaScript="true" ref="recaptcha" @verify="onVerify">
                <!--<q-checkbox v-model="ri" label="recap"/>-->
            </vue-recaptcha>

            <!--Newsletter-->
            <q-checkbox v-model='user.newsletter'></q-checkbox>> <span>Send updates to my email address.</span>
            
            <!--TOS-->
            <p>By clicking sign up you have read and agreed to our <a :href="site.tosUrl">term of use</a> and <a :href="site.privacyPolicyUrl">privacy policy</a>.</p>

            <q-btn label="Sign up" type="submit" color="primary"></q-btn>
        </FormulteForm>>
        <p>Already have an account? <router-link to="/sign-in">Sign in</router-link></p>
    </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

import { FirebaseAuth } from "../api/auth/FirebaseAuth";
let zxcvbn = require('zxcvbn');
let firebase = new FirebaseSetUp();
let firAuth = new FirebaseAuth(firebase.auth);
let api = new MailjetFunc();
let mediaApi = new MediaApi(api);

let auth = new FirebaseAuth()
export default {
    name: 'SignUp',
    data() {
        return {
            errors: {
                passwordLengthErr: '',
                signUpErrMsg: '',
                emailEmpty: '',
                passwordEmpty: '',
                displayNameEmpty: ''
            },
            user: {
                displayName: '',
                email: '',
                password: '',
                newsletter: '',
                isRobot: false,
                id: ''
            },
            passwordStrength: {
                show: false,
                messages: '',
                value: 0,
                variant: '',
                max: 0
            },
            signUp: true,
            verified: false
        }
    },

    components: {
        VueRecaptcha,
        ProgressBar
        },
    props: {
        logo: {
            type: String,
            required: true
        },
        site: {
            type: Object,
            required: true
        }
    },
    methods: {
        onSubmit() {
            if(this.user.isRobot) {
                this.message = "Please check the box to verify you're human."
                return;
            }
            if (!this.user.displayName) {
                this.errors.displayNameEmpty = 'Username is required.'
            }
            if (!this.user.email) {
                this.errors.emailEmpty = 'Email is required.';
                return
            }
            if (!this.user.password) {
                this.errors.passwordEmpty = 'Password is required.';
                return
            }
            this.checkUsername();
            if (this.validEmail&&this.validPassword) {
                firAuth.signUp(this.user.email, this.user.password, {displayName: this.user.displayName});
                if (firAuth.authMessage.failed) {
                this.errors.signUpErrMsg = firAuth.authMessage.signUpErrMsg;
                }
                else if (firAuth.authMessage.successful) {
                this.user.id = this.user.displayName;
                db.setItem('users', this.user);
                if (this.user.newsletter) {
                    mediaApi.postItem('postContact',{}, this.user);
                }
                this.signUp = false
                this.verified = true;
                }
            }
        },
        validEmail() {
            let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(this.user.email);
        },
        validPassword() {
            if (this.user.password.length < 7) {
                this.errors.passwordLengthErr = 'Your password is too short.';
            }
            else if (this.user.password.length > 128){
                this.errors.passwordLengthErr = 'Your password is too long.'
            }
            return this.user.password.length > 7 && this.user.password.length < 128
        },
        setPasswordStrength() {
            let result = zxcvbn(this.user.password);
            this.passwordStrength.value = result.score;
            this.passwordStrength.max = 4;
            switch (this.passwordStrength.value) {

                case 0:
                case 1:
                case 2:
                this.passwordStrength.messages = 'Pasword is weak.';
                this.passwordStrength.variant = 'danger';
                break;
                case 3:
                this.passwordStrength.messages = 'Pasword is moderate.';
                this.passwordStrength.variant = 'warning';
                break;
                case 4:
                this.passwordStrength.messages = 'Pasword is strong.';
                this.passwordStrength.variant = 'sucess';
                break;
            
                default:
                break;
            }
        },
        checkUsername() {
            let filters = {
                fieldPath: "displayName",
                op: "=",
                value: this.user.displayName,
            }
            let users = db.readItems('users', filters);
            users.forEach(user => {
                if(this.user.displayName === user.displayName) {
                this.errors.signUpErrMsg = 'Username has already been taken.';
                return
                }
            });
        },
        onVerify(response) {
            if (response) {
                this.user.isRobot = true;
            }
        }
    }
}
</script>