import config from "../../firebase.json";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithRedirect, EmailAuthProvider } from "firebase/auth";
/*import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/messaging";
//import "firebase/performance"
//import "firebase/remote-config"
import "firebase/storage";*/
//const FIREBASECONFIG = process.env.FIREBASECONFIG;
export class FirebaseAuth {
    constructor() {
        /*constructor(url?: string) {
            //this.storage = this.app.storage(url);
        }*/
        this.app = initializeApp(config);
        this.facebook = new FacebookAuthProvider();
        this.twitter = new TwitterAuthProvider();
        this.google = new GoogleAuthProvider();
        this.email = new EmailAuthProvider();
        this.auth = getAuth();
        this.user = this.auth.currentUser;
    }
    //analytics  = this.app.analytics();
    //firestore = this.app.firestore();
    //storage: firebase.storage.Storage;
    login(provider) {
        signInWithRedirect(this.auth, provider).then((result) => {
        });
    }
    logout() {
    }
    signUp() {
    }
    getUser() {
    }
    isAuthenticated() {
        if (this.auth.currentUser) {
            return true;
        }
        return false;
    }
}
