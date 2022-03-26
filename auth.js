//npm install passport-google-oidc
router.get(
    '/oauth2/redirect/google', passport.authenticate(
        'google', { successRedirect: '/', failureRedirect: '/login' }
        )
    );
