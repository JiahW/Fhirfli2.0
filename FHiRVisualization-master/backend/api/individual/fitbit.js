/*
The Fitbit OAuth 2.0 authentication strategy requires a verify callback, 
which accepts these credentials and calls done providing a user, 
as well as options specifying a client ID, client secret, and callback URL.
*/
var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;

passport.use(new FitbitStrategy({
    clientID:     "22DB8R",
    clientSecret: "dbc7f22e706a3d0270536abbc80b5d39",
    callbackURL: "https://app-settings.fitbitdevelopercontent.com/simple-redirect.html"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

/*
Use passport.authenticate(), specifying the 'fitbit' strategy, to authenticate requests.
For example, as route middleware in an Express application:
*/

app.get('/auth/fitbit',
  passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }
));

app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', { 
        successRedirect: '/auth/fitbit/success',
        failureRedirect: '/auth/fitbit/failure'
}));