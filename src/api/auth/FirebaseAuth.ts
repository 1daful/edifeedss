import config from "../../firebase.json";
import {initializeApp} from "firebase/app";
import { initializeAuth,indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence, GoogleAuthProvider,FacebookAuthProvider, TwitterAuthProvider, signInWithRedirect, AuthProvider, EmailAuthProvider, browserPopupRedirectResolver, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, applyActionCode, sendPasswordResetEmail, verifyBeforeUpdateEmail, User, signInWithEmailAndPassword, reauthenticateWithCredential, AuthCredential, updatePassword, deleteUser, linkWithRedirect, getRedirectResult, fetchSignInMethodsForEmail, SignInMethod, signInWithCredential} from "firebase/auth";
//import { provide } from "vue";
/*import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/messaging";
//import "firebase/performance"
//import "firebase/remote-config"
import "firebase/storage";*/

//const FIREBASECONFIG = process.env.FIREBASECONFIG;

export class FirebaseAuth implements Auth {
constructor() {
    //this.storage = this.app.storage(url);
    this.auth.onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
            }
        });
}
    log!: Record<string, any>;
    authMessage = {
        sentEmail: '',
        resetPassword: '',
        deleteUser: '',
        signUpErrMsg: '',
        updateProfile: '',
        updatePassword: '',
        successful: false,
        failed: false
    }

    app = initializeApp(config);
    provider?: AuthProvider

    auth = initializeAuth(this.app,  {persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]})
    user = this.auth.currentUser
    //analytics  = this.app.analytics();
    //firestore = this.app.firestore();
    //storage: firebase.storage.Storage;

    async login(provider?: AuthProvider, credentials?: Record<string, any>) {
        let log: Record<string, any> = {};
        let signUpErrMsg: string = '';
        if (provider){
            signInWithRedirect(this.auth, provider, browserPopupRedirectResolver)
        }
        else if (credentials) {
            signInWithEmailAndPassword(this.auth, credentials.email, credentials.password)
            .catch(function(error) {
                log.errorCode = error.code;
                log.errorMessage = error.message;
    
            switch (error.code) {
                case 'auth/invalid-email':
                    signUpErrMsg = 'Email address is invalid.'
                    break;
                case 'auth/user-not-found':
                    signUpErrMsg = 'Email or password is not correct.'
                    break;
                case 'auth/wrong-password':
                    signUpErrMsg = 'Email or password is not correct.';
                    break;
                default:
                    break;
            }
            });
        }
        this.authMessage.signUpErrMsg = signUpErrMsg;
        this.log = log;
    }

    logout() {
        this.auth.signOut()
    }

    signUp(email: string, password: string, param: object) {
        let signUpErrMsg: string = '';
        let log: Record<string, any> = {};
        createUserWithEmailAndPassword(this.auth, email,password).then((userCredential) => {
            const user = userCredential.user
            updateProfile(user, param);
            this.sendEmailVerification(user).then(() => {
                 this.authMessage.sentEmail = 'Verification link has been sent to your email address. Please check your inbox';
            })
            this.authMessage.successful = true;
            //applyActionCode(auth, code);
        })
        .catch((error) =>{
            log.errorCode = error.code;
            log.errorMessage = error.message;
            this.authMessage.failed = true;

        switch (error.code) {
            case 'auth/email-already-in-use':
                signUpErrMsg = 'Email address is already in use.'
                break;
            case 'auth/invalid-email':
                signUpErrMsg = 'Email address is invalid.'
                break;
            case 'auth/operation-not-allowed':
                signUpErrMsg = 'Eror occurred during sign up.'
                break;
            case 'auth/weak-password':
                signUpErrMsg = 'Password not strong enough. Add more characters such as numbers and special characters';
                break;
            default:
                break;
        }
        })
        this.log = log;
        this.authMessage.signUpErrMsg = signUpErrMsg;
    }

    getUser() {

    }

    
    sendPasswordResetEmail(email: string) {
        let log: Record<string, any> = {};
        let resetPassword = '';
        sendPasswordResetEmail(this.auth, email).then(() =>{
           
        this.authMessage.resetPassword = 'Password reset link has been sent to your email address. Check your inbox.'
        }).catch((error) => {
                log.errorCode = error.code;
                log.errorMessage = error.message;
            });
        this.log = log;
    }
    
    updateEmail(email: string) {
        let log: Record<string, any>;
        if (this.user) {
            this.auth.useDeviceLanguage();
            verifyBeforeUpdateEmail(this.user, email)
            .then(() => {
                this.authMessage.sentEmail = 'verification link sent to your email address. Check your inbox to verify.';
            }).catch(function(error) {
                log.errorCode = error.code;
                log.errorMessage = error.message;
            })
        }
    }

    updatePassword(user: User, credential: AuthCredential, email: string, newPassword: string) {
        reauthenticateWithCredential(user, credential)
        updatePassword(user, newPassword).then(() => {
            this.sendPasswordResetEmail(email);
        }).catch((error) => {
            this.log.errorCode = error.code;
            this.log.errorMessage = error.message;
            this.authMessage.updatePassword = error.message;
        })
    }
    updateProfile(user: User, filters: Record<string, any>) {
        let log: Record<string, any> = {};
        //let updateProfile: string = ''
        if (this.user){
            updateProfile(user, filters).then(() =>{
                this.authMessage.updateProfile = 'Profile successfully updated.'
            }).catch(function(error) {
                log.errorCode = error.code;
                log.errorMessage = error.message;
            })
        }
        this.log = log;
    }

    async sendEmailVerification(user: User) {
        let log: Record<string, any> = {};
        let sentEmail: string = '';
        sendEmailVerification(user).then(function(){
            sentEmail = 'Verification link has been sent to your email address. Please check your inbox';
        }).catch((error) => {
                log.errorCode = error.code;
                log.errorMessage = error.message;
            });
        this.authMessage.sentEmail = sentEmail;
        this.log = log;
        
    }

    deleteUser(user: User) {
        let log: Record<string, any> = {};
        //let deleteUser = '';
        deleteUser(user).then(() => {
        this.authMessage.deleteUser =  'Account deleted successfully'
        }).catch(function(error) {
            log.errorCode = error.code;
            log.errorMessage = error.message;
        });
        this.log = log;
    }
    isAuthenticated() {
        if (this.auth.currentUser)
        {
            return true
        }
        return false
    }
    linkWithRedirect(user: User) {
        if (this.user && this.provider) {
            linkWithRedirect(this.user, this.provider)
            .then(/* ... */)
            .catch(/* ... */);
        }
    }

    getResult() {
        getRedirectResult(this.auth, browserPopupRedirectResolver)
        .then((userCredential) => {
            userCredential
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/acount-exists-with-different-credential" :
                    return fetchSignInMethodsForEmail(this.auth, error.email)
                case "auth/credential-already-in-use" :
                    signInWithCredential(this.auth, error.credential)
            }
        })
    }
}