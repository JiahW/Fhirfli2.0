const FitbitModel = require('../../db/models/fitbit').fitbit;

module.exports = (app,fitbitAPI) => 
{ 

  app.get('/api/fitbitdata', (req, res) => {
    FitbitModel.find({"userId":req.user._id}, null , {})
        .then(data => {
            if ( (data != undefined) && (data.updatedAt != undefined) && (((new Date()).getTime() - data.updatedAt.getTime()) < 3600) )
            {
                console.log("here");
                res.send(data);
            }else{
                console.log("else");
                res.send(fitbitAPI.getFitBit(req));
            }
        }).catch(err => {
            res.send(err);
            console.log(err);
        });   
    });
}

