import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
//import { Auth0Plugin } from './api/auth';
import quasarUserOptions from './quasar-user-options'
import config from "../public/config.json";
const VueFormulate = require("@braid/vue-formulate");
//import VueSocialSharing from 'vue-social-sharing';
//import VueKeyCloak from '@dsb-norge/vue-keycloak-js';

const domain = config.api.auth0.domain
const clientId = config.api.auth0.clientId

createApp(App).use(Quasar, quasarUserOptions).use(VueFormulate)/*.use(Auth0Plugin, {
    domain, 
    clientId,
    onRedirectCallback(appState: any) {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    }
}).use(VueKeyCloak, {*/
    /*init: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html"
    },
    config: {
        url: 'http://localhost:8080/auth',
        clientId: 'edifeeds',
        realm: 'edifeeds-app'
    }
})*/
.use(router).mount('#app')
