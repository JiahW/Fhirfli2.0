module.exports = (app, passport) => 
{
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const User = require('../db/models/user').individual;
  var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;
  var fitbitProfile, OAuthtoken;
  var todayDate = new Date().toISOString().slice(0,10);
  var fhir = require('fhir-converter');

  // Creating a converter from Fitbit to FHIR
  var converter = new fhir('fitbit');

  /*
  The Fitbit OAuth 2.0 authentication strategy requires a verify callback, 
  which accepts these credentials and calls done providing a user, 
  as well as options specifying a client ID, client secret, and callback URL.
  */
  passport.use(new FitbitStrategy({
      clientID:     '22DB8R',
      clientSecret: 'dbc7f22e706a3d0270536abbc80b5d39',
      callbackURL: "https://80d6bbc0.ngrok.io/auth/fitbit/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      // TODO: save accessToken here for later use
      fitbitProfile = profile.id;
      OAuthtoken = accessToken;
      
      done(null, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile,
      });
      var xhr = new XMLHttpRequest();

      // activites-heart
      // xhr.open('GET', 'https://api.fitbit.com/1/user/'+ fitbitProfile +'/activities/heart/date/today/1w.json');

      // activites
      // xhr.open('GET', 'https://api.fitbit.com/1/user/'+ fitbitProfile +'/activities/date/' + todayDate + '.json');
      console.log(todayDate);
      // Weight, https://api.fitbit.com/1/user/[user-id]/body/log/weight/date/[date].json
      xhr.open('GET', 'https://api.fitbit.com/1/user/'+ fitbitProfile +'/body/log/weight/date/' + todayDate + '.json');

      //  Sleep, GET https://api.fitbit.com/1.2/user/[user-id]/sleep/date/[date].json
      //  xhr.open('GET', 'https://api.fitbit.com/1.2/user/'+ fitbitProfile +'/sleep/date/' + todayDate + '.json');
      
      xhr.setRequestHeader("Authorization", 'Bearer ' + OAuthtoken);
      xhr.onload = function() {
        if (xhr.status === 200) { // xhr.status === 200, means status is "OK", 404 for not found, 403 for forbidden, 500 is internal server error, 400 is 
            var myObj = JSON.parse(this.responseText);
            var str = JSON.stringify(myObj, null, 2);
            // console.log(str);
            // Run the converter on the resource
            result = converter.convert(myObj);

            // The result is a FHIR bundle containing sleep observations
            console.log(myObj);
        }else{
          console.log(xhr.status);
        }
      };
      xhr.send()
  
    }
  ));
  
  /*
  Use passport.authenticate(), specifying the 'fitbit' strategy, to authenticate requests.
  For example, as route middleware in an Express application:
  scope detemrmines what kind of info the web app is allowed to access
  */
  app.get('/auth/fitbit',passport.authenticate('fitbit', { scope: [ 'sleep', 'activity','heartrate','location','profile','weight'] }
  ));

  app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', { 
          successRedirect: '/individual/home',
          failureRedirect: '/auth/fitbit/failure'
  }));
  
  
    
}