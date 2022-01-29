import { Auth0Client } from '@auth0/auth0-spa-js';
import createAuth0Client from '@auth0/auth0-spa-js';
import { Axiosi } from "../Axiosi";
//import express from 'express';

export class Auth0 implements Auth {

    auth!: Auth0Client
    axiosi = new Axiosi();

    async createAuth() {
        const config = await this.axiosi.load('../config.json');
        if (config) {
            this.auth = await createAuth0Client({
                domain: config.data.domain,
                client_id: config.data.client_id,
                useRefreshTokens: true,
                redirect_uri: window.location.origin
            })
            /*this.auth = new Auth0Client({
                domain: config.data.domain,
                client_id: config.data.client_id, 
                useRefreshTokens: true,
                redirect_uri: window.location.origin
            })*/
        }  
        try {
            const user = await this.getUser();
            if (!user) {
                await this.handleRedirect()
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
          //this.isAuthenticated = await this.auth.isAuthenticated();
          this.loading = false;
        }
    }

    isAuthenticated() {}
    loading = true
    user = this.getUser()

    async login(appState: any) {
        await this.auth.loginWithRedirect({
            appState
        })
    }

    async signUp() {
        await this.auth.loginWithRedirect({
            screen_hint: "signup"
        })
    }

    async handleRedirect() {
        const query = window.location.search;
        if (query.includes("code") && query.includes("state")){
            try {
                const { appState } = await this.auth.handleRedirectCallback();
                //this.isAuthenticated = true;
                return appState
              } catch (err) {
                console.log("Error parsing redirect:", err);
              } finally {
                  this.loading = false;
              }
        }
    }

    logout() {
        this.auth.logout({
            returnTo: window.location.origin
        })
    }

    async getUser(): Promise<any> {
        try{
            const accessToken = await this.auth.getTokenSilently();
            const user = await this.auth.getUser();
            return {...user, accessToken}
        }
        catch (error) {
            console.log(error)
        }
        return;
    }
}