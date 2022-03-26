import config from "../../../public/config.json";
import { createClient, Provider, User } from "@supabase/supabase-js";

class OryAuth implements Auth {
  private constructor() {
    //if(SupabaseAuth._instance)
  }

    options = {
      schema: 'public',
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }

    private static _instance?: OryAuth

    static get Instance() {
      return this._instance || new OryAuth()
    }

    supabase = createClient(config.api.supabase.url, config.api.supabase.key, this.options);
    auth = this.supabase.auth

    authenticated: boolean = false

    //jwt?: string

    async signUp(userCred: Record<string, any>, data: Object) {
      const { user, session, error } = await this.auth.signUp(
        {
          email: userCred.email,
          password: userCred.password,
        },
        {
          data: data
        }
      )
      return { user, session, error }
    }

    async login(providerId?: string, userCred?: Record<string, any>) {
        let provider: Provider = "facebook"
        let scopes
        switch (providerId) {
            case "google" :
                provider = 'google'
                scopes = ''
                break;
            case "facebook" :
                provider = 'facebook'
                scopes = 'public_profile email'
                break;
            case "twitter" :
                provider = 'twitter'
                scopes = ''
                break;
        
            default:
              if (userCred) {
                const { user, session, error } = await this.auth.signIn({
                    email: userCred.email,
                    password: userCred.password
                  })
              //const jwt = session?.access_token
              this.authenticated = true
              return {user, session, error}
              }
                break;
        }
        const { user, session, error } = await this.auth.signIn({
            provider: provider
          }, {
            scopes: scopes
          })
          /*if (session) {
            const oAuthToken = session.provider_token // use to access provider API
          }*/
          this.authenticated = true
          return {user, session, error}
    }
    async logout() {
        const { error } = await this.auth.signOut()
        return error
    }
    async getUser(jwt: string) {
      const { user, error } = await this.auth.api.getUser(jwt)
      return { user, error }
    }
    isAuthenticated() {
      this.auth.onAuthStateChange((event, session) => {
        this.authenticated = true
        console.log("event and session")
        console.log(event, session)
      })
      return this.authenticated
    }

    isSignedIn() {
      let signedIn = false
      this.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN'){
          console.log('SIGNED_IN', session)
        }
      })
      signedIn = true
      return signedIn
    }

    isSignedOut() {
      this.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
      })
    }

    isDeleted() {
      this.auth.onAuthStateChange((event, session) => {
        if (event == 'USER_DELETED') console.log('USER_DELETED', session)
      })
    }

    async updateCred(email : string) {
        const { user, error } = await this.auth.update({email: email})
        return { user, error }
    }

    async recoverPassword(email: string) {
      const { data, error } = await this.auth.api.resetPasswordForEmail(email)
      return { data, error }
    }

    saveUser(issuer, profile, cb) {
      db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
        issuer,
        profile.id
      ], function(err, cred) {
        if (err) { return cb(err); }
        if (!cred) {
          // The Google account has not logged in to this app before.  Create a
          // new user record and link it to the Google account.
          db.run('INSERT INTO users (name) VALUES (?)', [
            profile.displayName
          ], function(err) {
            if (err) { return cb(err); }
  
            var id = this.lastID;
            db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
              id,
              issuer,
              profile.id
            ], function(err) {
              if (err) { return cb(err); }
              var user = {
                id: id.toString(),
                name: profile.displayName
              };
              return cb(null, user);
            });
          });
        } else {
          // The Google account has previously logged in to the app.  Get the
          // user record linked to the Google account and log the user in.
          db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            return cb(null, user);
          });
        }
      })
    }

passport.use(
  new GoogleStrategy({
      clientID: process.env['GOOGLE_CLIENT_ID'],
      clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
      callbackURL: '/oauth2/redirect/google', scope: [ 'profile' ] }, saveUser()
      )
)


}

const auth = OryAuth.Instance
//Object.freeze(auth)
export default auth