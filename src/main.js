import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { Quasar } from 'quasar';
//import { Auth0Plugin } from './api/auth';
import quasarUserOptions from './quasar-user-options';
import iconSet from "quasar/icon-set/mdi-v6";
import auth from "./api/auth/SupabaseAuth";
const app = createApp(App);
app.config.globalProperties.$auth = auth;
app.use(Quasar, quasarUserOptions, { iconSet: iconSet }) /*.use(Auth0Plugin, {
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
    .use(router).mount('#app');
