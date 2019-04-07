const FitbitModel = require('../../db/models/fitbit').fitbit;
const renew_acess_token = require('../../auth/fitbit').renew_acess_token;

module.exports = (app,getFitBit) => 
{ 

  app.get('/api/fitbitdata', (req, res) => {
    FitbitModel.find({"userId":req.user._id}, null , {})
        .then(data => {
            // console.log((Date.now()) - data.updatedAt);
            if ( (data != undefined) && (data.updatedAt != undefined) && (((new Date()) - data.updatedAt) < 3600) )
            {
                res.send(data);
            }else{
                getFitBit(req,res);
                
            }
        }).catch(err => {
            res.send(err);
            console.log(err);
        });   
    });
}

