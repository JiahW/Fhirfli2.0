module.exports = (app, passport) => 
{
  const User = require('../db/models/user').individual;
  const FitbitApiClient = require("fitbit-node");
  var fhir = require('fhir-converter');
  var callback = "https://fhirfli.uk.to/auth/fitbit/callback";
  // Creating a converter from Fitbit to FHIR
  var converter = new fhir('fitbit');

  const client = new FitbitApiClient({
    clientId: "22DB8R",
    clientSecret: "dbc7f22e706a3d0270536abbc80b5d39",
    apiVersion: '1.2'
  });

  app.get("/auth/fitbit/refresh", (req,res)=>{
    client.refreshAccessToken(req.user.access_token, req.user.refresh_token).then(result => {
      /*User.findById(req.user._id).then(user => {
        user.access_token = result.access_token;
        user.refresh_token = result.refresh_token;
        user.save();
      });*/
      User.findOneAndUpdate({"_id":req.user._id}, {$set: { access_token: result.access_token, refresh_token: result.refresh_token }}, {upsert:false}, function(err, doc){
        if (err) res.send(500, { error: err });
      });
      return res.status(200);
    });
  });

  /*
  // use the access token to fetch the user's profile information
    client.get("/profile.json", result.access_token).then(results => {
      res.send(results[0]);
    }).catch(err => {
      res.status(err.status).send(err);
    });*/

  app.get('/auth/fitbit',(req, res) => {res.redirect(client.getAuthorizeUrl('sleep activity heartrate location profile weight', callback));});

  app.get( '/auth/fitbit/callback', (req, res) => {
  // exchange the authorization code we just received for an access token
  client.getAccessToken(req.query.code, callback).then(result => {
    User.findOneAndUpdate({"_id":req.user._id}, {$set: { access_token: result.access_token, refresh_token: result.refresh_token }}, {upsert:false}, function(err, doc){
        if (err) res.send(500, { error: err });
    });
    /*User.findById(req.user._id).then(user => {
      user.access_token = result.access_token;
      user.refresh_token = result.refresh_token;
      user.save();
    });*/
    return res.redirect("/individual/home");
  }).catch(err => {
    return res.status(err.status).send(err);
  });
});
    
}

