const User = require('../db/models/user').individual;
const FitbitModel = require('../db/models/fitbit').fitbit;

const FitbitApiClient = require("fitbit-node");
var fhir = require('fhir-converter');

var callback = "https://4be71655.ngrok.io/auth/fitbit/callback";

// Creating a converter from Fitbit to FHIR
var converter = new fhir('fitbit');
var todayDate = new Date().toISOString().slice(0,10);
var authenticated = false;

const client = new FitbitApiClient({
  clientId: "22DB8R",
  clientSecret: "dbc7f22e706a3d0270536abbc80b5d39",
  apiVersion: '1.2'
});

function renew_acess_token (req){
  client.refreshAccessToken(req.user.access_token, req.user.refresh_token).then(result => {

  User.findOneAndUpdate({"_id":req.user._id}, 
  {$set: { access_token: result.access_token, refresh_token: result.refresh_token }}, {upsert:false}, function(err, doc){
  if (err) {
    return err;
  }
  });
    return 1;
  }).catch(err =>{
    console.log((err));
        
        return (err);
  });
}


function component1(app) {

  app.get('/auth/fitbit',(req, res) => {
  // Explicitly save the session before redirecting!
  req.session.save(() => {
    res.redirect(client.getAuthorizeUrl('sleep activity nutrition settings social heartrate location profile weight', callback));
  }); 
  });

  app.get( '/auth/fitbit/callback', (req, res) => {
  // exchange the authorization code we just received for an access token
  client.getAccessToken(req.query.code, callback).then(result => {
  User.findOneAndUpdate({"_id":req.user._id}, {$set: { access_token: result.access_token, refresh_token: result.refresh_token }}, {upsert:false}, function(err, doc){
      if (err) res.send(500, { error: err });
  });  
      return res.redirect("/individual/home");
    }).catch(err => {
      return res.status(500).send(err);
    });
  });
}

function component2(req,res) {
  req.user.authenticated = true;
  // https://dev.fitbit.com/build/reference/web-api/


  // https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json
  client.get("/activities/heart/date/"+ todayDate + "/1w.json", req.user.access_token)
  .then(results => {
    console.log("got to results....");
    var Result = converter.convert(results[0]);
    var stringResult = JSON.stringify(Result);
    // console.log(results[0]);
    // console.log(weight["weight"][0]["weight"]);
    var myJSON = JSON.stringify(results[0]);
    

    const newFitbitData = {
      'userId': req.user.id,
      'fitbitdata': myJSON,
      'FitbitFHiRdata': stringResult,
      'updatedAt': new Date()
    };

    FitbitModel.findOneAndUpdate({"userId":req.user.id}, newFitbitData, {upsert: true},function (err, savedData)  {
      if (err) {
          console.log("FitbitModel.findOneAndUpdate err");
          console.log((err));
          return err;
      } 
    });
    // console.log(JSON.stringify(newFitbitData.fitbitdata));
    // console.log("---------------------------------");
    // console.log("---------------------------------");
    // console.log((newFitbitData.fitbitdata));
    // console.log("---------------------------------");
    // console.log("---------------------------------");
    // var myjson = (JSON.parse(newFitbitData.fitbitdata));
    // console.log(myjson['activities-heart'][0]['value']);

    if (JSON.stringify(newFitbitData).includes("Access token expired")) // if access token is invalid
        {
          if (renew_acess_token(req) == 1){
            
            return(component2(req));
          }
        
        }

    return res.send(newFitbitData);
    }).catch(err => {
        console.log("catch(err =>  errrrrrrr");
        console.log((err));
        
        return (err);
    });
}

module.exports = {component1,component2,renew_acess_token};
