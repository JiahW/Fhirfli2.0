const FitbitModel = require('../../db/models/fitbit').fitbit;
const renew_acess_token = require('../../auth/fitbit').renew_acess_token;

module.exports = (app,getFitBit) => 
{ 

  app.get('/api/fitbitdata', (req, res) => {
    FitbitModel.find({"userId":req.user._id}, null , {})
        .then(data => {
            // if a request is made within 10 seconds (10*1000) don't update it, send the same data
            if ( (data != undefined) && (data[0].updatedAt != undefined) && (((new Date()).getTime() - data[0].updatedAt.getTime()) < (1)*1000) ) {
                res.send(data[0]);
            }else{
                getFitBit(req,res);
                
            }
        }).catch(err => {
            res.send(err);
            console.log(err);
        });   
    });
}

