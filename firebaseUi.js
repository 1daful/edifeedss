
￼

￼

Firebase Documentation

￼

ProductsMoreUse CasesPricingDocsMoreOverviewFundamentalsMoreBuildMoreRelease & MonitorMoreEngageMoreReferenceSamplesCommunityMoreSupportGo to console

Overview

Emulator Suite

Authentication

IntroductionWhere do I start?Users in Firebase Projects

iOS+

Android

Web

Sign in with a pre-built UIGet StartedManage UsersPassword AuthenticationEmail Link AuthenticationGoogle Sign-InFacebook LoginSign in with AppleTwitterGitHubMicrosoftYahooPhone NumberUse a Custom Auth SystemAnonymous AuthenticationLink Multiple Auth ProvidersCustomize DependenciesOAuth Sign-In for CordovaAuth State PersistencePassing State in Email ActionsService Worker Sessions

C++

Unity

Admin

Customize the Email Action HandlerExtend with Cloud FunctionsEmail Custom DomainsCase StudiesUsage Limits

Realtime Database

Cloud Firestore

Storage

Machine Learning

Hosting

Cloud Functions

Security Rules

Extensions

RELATED PRODUCTS

Cloud MessagingRemote Config

Firebase

Firebase Documentation

Build

Was this helpful?

Send feedback

Easily add sign-in to your Web app with FirebaseUI

 On this pageBefore you beginInitialize FirebaseUISet up sign-in methodsEmail address and passwordEmail link authenticationOAuth providers (Google, Facebook, Twitter and GitHub)Phone numberSign in

FirebaseUI is a library built on top of the Firebase Authentication SDK that provides drop-in UI flows for use in your app. FirebaseUI provides the following benefits:

Multiple Providers - sign-in flows for email/password, email link, phone authentication, Google, Facebook, Twitter and GitHub sign-in.Account Linking - flows to safely link user accounts across identity providers.Customization - override CSS styles of FirebaseUI to match your app requirements. Also, because FirebaseUI is open source, you can fork the project and customize it exactly to your needs.One-tap sign-up and automatic sign-in - automatic integration with One-tap sign-up for fast cross-device sign-in.Localized UI - internationalization for over 40 languages.Upgrading anonymous users - ability to upgrade anonymous users through sign-in/sign-up. For more information, visit the Upgrading anonymous users section.Note: FirebaseUI is not compatible with the v9 modular SDK. The v9 compatibility layer (specifically, the app-compat and auth-compat packages) permits the usage of FirebaseUI alongside v9, but without the app size reduction and other benefits of the v9 SDK.

Before you begin

Add Firebase Authentication to your web application.

Include FirebaseUI via one of the following options:

CDN

Include the following script and CSS file in the <head> tag of your page, below the initialization snippet from the Firebase Console:

<script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js"></script>
<link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />

npm Module

Install FirebaseUI and its dependencies via npm using the following command:

$ npm install firebaseui --save

require the following modules within your source files:

var firebase = require('firebase');
var firebaseui = require('firebaseui');

Bower Component

Install FirebaseUI and its dependencies via Bower using the following command:

$ bower install firebaseui --save

Include the required files in your HTML, if your HTTP Server serves the files within bower_components/:

<script src="bower_components/firebaseui/dist/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="bower_components/firebaseui/dist/firebaseui.css" />

Initialize FirebaseUI

After importing the SDK, initialize the Auth UI.

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

Set up sign-in methods

Before you can use Firebase to sign in users, you must enable and configure the sign-in methods you want to support.

Email address and password

In the Firebase console, open the Authentication section and enable email and password authentication.

Add the email provider ID to the list of FirebaseUI signInOptions.

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});

Optional: The EmailAuthProvider can be configured to require the user to enter a display name (defaults to true).

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ]
});

Email link authentication

In the Firebase console, open the Authentication section. On the Sign in method tab, enable the Email/Password provider. Note that email/password sign-in must be enabled to use email link sign-in.

In the same section, enable Email link (passwordless sign-in) sign-in method and click Save.

Add the email provider ID to the list of FirebaseUI signInOptions along with the email link signInMethod.

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    }
  ],
  // Other config options...
});

When rendering the sign-in UI conditionally (relevant for single page apps), use ui.isPendingRedirect() to detect if the URL corresponds to a sign-in with email link and the UI needs to be rendered to complete sign-in.

// Is there an email link sign-in?
if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}
// This can also be done via:
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

Optional: The EmailAuthProvider for email link sign-in can be configured to allow or block the user from completing cross device sign-in.

An optional emailLinkSignIn callback can be defined to return the firebase.auth.ActionCodeSettings configuration to use when sending the link. This provides the ability to specify how the link can be handled, custom dynamic link, additional state in the deep link, etc. When not provided, the current URL is used and a web only flow is triggered.

Email link sign-in in FirebaseUI-web is compatible with FirebaseUI-Android and FirebaseUI-iOS where one user starting the flow from FirebaseUI-Android can open the link and complete sign-in with FirebaseUI-web. The same is true for the opposite flow.

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      // Allow the user the ability to complete sign-in cross device,
      // including the mobile apps specified in the ActionCodeSettings
      // object below.
      forceSameDevice: false,
      // Used to define the optional firebase.auth.ActionCodeSettings if
      // additional state needs to be passed along request and whether to open
      // the link in a mobile app if it is installed.
      emailLinkSignIn: function() {
        return {
          // Additional state showPromo=1234 can be retrieved from URL on
          // sign-in completion in signInSuccess callback by checking
          // window.location.href.
          url: 'https://www.example.com/completeSignIn?showPromo=1234',
          // Custom FDL domain.
          dynamicLinkDomain: 'example.page.link',
          // Always true for email link sign-in.
          handleCodeInApp: true,
          // Whether to handle link in iOS app if installed.
          iOS: {
            bundleId: 'com.example.ios'
          },
          // Whether to handle link in Android app if opened in an Android
          // device.
          android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
          }
        };
      }
    }
  ]
});

OAuth providers (Google, Facebook, Twitter and GitHub)

In the Firebase console, open the Authentication section and enable the specified OAuth provider sign-in. Make sure the corresponding OAuth client ID and secret are also specified.

Also in the Authentication section, make sure the domain where your sign-in page will be rendered is also added to the authorized domains list.

Add the OAuth provider ID to the list of FirebaseUI signInOptions.

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    // List of OAuth providers supported.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});

Optional: To specify custom scopes, or custom OAuth parameters per provider, you can pass an object instead of just the provider value:

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [
        'https://www.googleapis.com/auth/contacts.readonly'
      ],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: 'select_account'
      }
    },
    {
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        // Forces password re-entry.
        auth_type: 'reauthenticate'
      }
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
    firebase.auth.EmailAuthProvider.PROVIDER_ID // Other providers don't need to be given as object.
  ]
});




// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());




<!-- The surrounding HTML is left untouched by FirebaseUI.
     Your app may use that space for branding, controls and other customizations.-->
<h1>Welcome to My Awesome App</h1>
<div id="firebaseui-auth-container"></div>
<div id="loader">Loading...</div>




// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
