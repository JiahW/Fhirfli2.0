const FitbitModel = require('../../db/models/fitbit').fitbit;
const renew_acess_token = require('../../auth/fitbit').renew_acess_token;
const isauth = require('../../auth/fitbit').authenticated;

module.exports = (app,getFitBit) => 
{ 

  app.get('/api/fitbitdata', (req, res) => {
    FitbitModel.find({"userId":req.user._id}, null , {})
        .then(data => {
		console.log(data);
            // if a request is made within 10 seconds (10*1000) don't update it, send the same data
            if ( (data != undefined) && (data != []) && (data[0] != undefined)  && (data[0].updatedAt != undefined) && (((new Date()).getTime() - data[0].updatedAt.getTime()) < (1)*1000) ) {
                
                res.send(data[0]);
            }else{
                getFitBit(req,res);
                req.user.authenticated = true;
            }
        }).catch(err => {
            res.send(err);
            console.log(err);
        });   
    });

    // app.get('/api/FitbitIsAuth', (req, res) => {
    //     console.log(req.user.authenticated);
    //     if (req.user.authenticated == undefined) res.send("false");
    //     // res.send((req.user.authenticated));
    // });
}

