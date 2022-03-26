import config from "../../firebase.json";
import {initializeApp} from "firebase/app";
import { initializeAuth,indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence, GoogleAuthProvider,FacebookAuthProvider, TwitterAuthProvider, signInWithRedirect, AuthProvider, EmailAuthProvider, browserPopupRedirectResolver, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, applyActionCode, sendPasswordResetEmail, verifyBeforeUpdateEmail, User, signInWithEmailAndPassword, reauthenticateWithCredential, AuthCredential, updatePassword, deleteUser, linkWithRedirect, getRedirectResult, fetchSignInMethodsForEmail, SignInMethod, signInWithCredential, linkWithCredential, getIdToken, setPersistence} from "firebase/auth";
import * as firebaseui from "firebaseui";

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
    console.log(firebaseui.auth)
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
    //provider?: AuthProvider

    auth = initializeAuth(this.app,  {persistence: [indexedDBLocalPersistence, browserLocalPersistence, browserSessionPersistence]})
    user = this.auth.currentUser
    GOOGLE_Id = GoogleAuthProvider.PROVIDER_ID
    FACEBOOK_ID =FacebookAuthProvider.PROVIDER_ID
    TWITTER_ID = TwitterAuthProvider.PROVIDER_ID
    //analytics  = this.app.analytics();
    //firestore = this.app.firestore();
    //storage: firebase.storage.Storage;

    getUi() {
        if (firebaseui.auth.AuthUI.getInstance()) {
            return firebaseui.auth.AuthUI.getInstance()
        }
        else {
             return new firebaseui.auth.AuthUI(this.auth)
        }
    }
    ui = this.getUi()
    uiConfig = {
        signInOptions: [
            {
                provider: GoogleAuthProvider.PROVIDER_ID,
                scopes: [
                    'https://www.googleapis.com/auth/contacts.readonly'
                ],
                customParameters: {
                    // Forces account selection even when one account
                    // is available.
                    prompt: 'select_account'}
                },
                {
                    provider: FacebookAuthProvider.PROVIDER_ID,
                    scopes: [
                        'public_profile',
                        'email'
                    ],
                    customParameters: {
                        // Forces password re-entry.
                        auth_type: 'reauthenticate'
                    }
                },
        TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
        EmailAuthProvider.PROVIDER_ID // Other providers don't need to be given as object.
    ]
    }
    startUI() {
        if(this.ui)
        this.ui.start('#auth-ui', this.uiConfig);
    }

    async login(providerId?: string, credentials?: Record<string, any>) {
        let provider: AuthProvider = new GoogleAuthProvider;
        const log: Record<string, any> = {};
        let signUpErrMsg: string = '';
        if (providerId){
            switch (providerId) {
                case "google":
                    provider = new GoogleAuthProvider();
                    break;

                case "facebook":
                    provider = new FacebookAuthProvider();
                    break;

                case "twitter":
                    provider = new TwitterAuthProvider()
                    break;
            
                default:
                    break;
            }
            if (provider)
            setPersistence(this.auth, browserSessionPersistence)
            signInWithRedirect(this.auth, provider, browserPopupRedirectResolver)
            .catch(error => {
                console.log(error)
                console.log(error.code, error.message)
            })
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

            console.log(error.code, error.message)
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
            this.log.errorCode = error.code;
            this.log.errorMessage = error.message;
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
        this.authMessage.signUpErrMsg = signUpErrMsg;
    }

    async getUser() : Promise<User | null> {
        this.auth.onAuthStateChanged((user) => {
            console.log(user, " logged out")
            if (user) {
                this.user = user;
                console.log("this.onauthchanged:", this.user)
            }
            return user
        });
        return this.auth.currentUser
    }

    
    sendPasswordResetEmail(email: string) {
        sendPasswordResetEmail(this.auth, email).then(() =>{
           
        this.authMessage.resetPassword = 'Password reset link has been sent to your email address. Check your inbox.'
        }).catch((error) => {
                this.log.errorCode = error.code;
                this.log.errorMessage = error.message;
            });
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
        const log: Record<string, any> = {};
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
        const log: Record<string, any> = {};
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
        const log: Record<string, any> = {};
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

    async getResult() {
        let user
        getRedirectResult(this.auth, browserPopupRedirectResolver)
        .then(async (userCredential) => {
            if (userCredential) {
            user = userCredential?.user
            userCredential?.providerId
            //const idToken = await getIdToken(user)
            /*switch () {
                case value:
                    
                    break;
            
                default:
                    break;
            }*/
            //const credential = GoogleAuthProvider.credential(idToken)
            
            /*sessionStorage.setItem()
            sessionStorage.getItem()*/

            //linkWithCredential(user, credential)
            }
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/acount-exists-with-different-credential" :
                    fetchSignInMethodsForEmail(this.auth, error.email).then((provider) => {
                        sessionStorage.setItem("provider", provider[0])
                    })
                    break
                case "auth/credential-already-in-use" :
                    signInWithCredential(this.auth, error.credential)
                    break
                default:
                    break
            }
        })
        return user
    }
}