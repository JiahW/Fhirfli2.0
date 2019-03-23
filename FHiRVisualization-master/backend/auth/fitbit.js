module.exports = (app, passport) => 
{
  const User = require('../db/models/user').individual;
  const FitbitModel = require('../db/models/fitbit').fitbit;
  const FitbitApiClient = require("fitbit-node");
  var fhir = require('fhir-converter');
  var callback = "https://0c81061b.ngrok.io/auth/fitbit/callback";
  // Creating a converter from Fitbit to FHIR
  var converter = new fhir('fitbit');
  var todayDate = new Date().toISOString().slice(0,10);

  const client = new FitbitApiClient({
    clientId: "22DB8R",
    clientSecret: "dbc7f22e706a3d0270536abbc80b5d39",
    apiVersion: '1.2'
  });

  function renew_acess_token (req){
    client.refreshAccessToken(req.user.access_token, req.user.refresh_token).then(result => {
 
      User.findOneAndUpdate({"_id":req.user._id}, {$set: { access_token: result.access_token, refresh_token: result.refresh_token }}, {upsert:false}, function(err, doc){
        if (err) return err;
      });
      return 1;
    });
  };

  app.get('/auth/fitbit',(req, res) => {
    // Explicitly save the session before redirecting!
    req.session.save(() => {
      res.redirect(client.getAuthorizeUrl('sleep activity heartrate location profile weight', callback));
    }); 
  });

  function getFitBit(req,accessToken){
    // use the access token to fetch the user's profile information
    // client.get("/profile.json", accessToken)
    // client.get("/sleep/date/" + todayDate + ".json", accessToken)
    
    // exchange the authorization code we just received for an access token
    
    client.get("/sleep/date/" + todayDate + ".json", accessToken).then(results => {
      var Result = converter.convert(results[0]);
      var stringResult = JSON.stringify(Result);
      // console.log(results[0]);
      // console.log(Result);
      var myJSON = JSON.stringify(results[0]);

      const newFitbitData = new FitbitModel({
        'userId': req.user.id,
        'fitbitdata': myJSON,
        'FitbitFHiRdata': stringResult
      });

      newFitbitData.save((err, savedData) => {
        // if (err) {
        //     console.log((err));
        //     // return res.json(err);
        // } else {
        //     return res.json({
        //         userId: savedData.userId,
        //         data: savedData.data
        //     });
        // }
      });

        // res.send(results[0]);
      }).catch(err => {
        // if (err == "access_token fdsvfb"){
        //   if (renew_acess_token(req) == 1){
        //     getFitBit(req,res);
        //   }
        // }
        console.log(err);
        return (err);
      });
    }
  
  app.get( '/auth/fitbit/callback', (req, res) => {
  // exchange the authorization code we just received for an access token
  client.getAccessToken(req.query.code, callback).then(result => {
    User.findOneAndUpdate({"_id":req.user._id}, {$set: { access_token: result.access_token, refresh_token: result.refresh_token }}, {upsert:false}, function(err, doc){
        if (err) res.send(500, { error: err });
    });  
    getFitBit(req,result.access_token);
        return res.redirect("/individual/home");
      }).catch(err => {
        return res.status(500).send(err);
      });
    });
    
}

