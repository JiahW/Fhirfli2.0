function parseFitbitHeart(heart)
{
    
    var heartList = heart["days"];
    var avgheartR1 = 0;
    var avgheartR2 = 0;
    var avgheartR3 = 0;
    var avgheartR4 = 0;
    
    try {
    for (var i = 0; i < 7; i++ )
    {
        if((heartList[i]["activities-heart"][0]["heartRateZones"][0]["minutes"]) != undefined) avgheartR1 += heartList[i]["activities-heart"][0]["heartRateZones"][0]["minutes"]; 
    }
    for (var i = 0; i < 7; i++ )
    {
        if((heartList[i]["activities-heart"][0]["heartRateZones"][1]["minutes"]) != undefined) avgheartR2 += heartList[i]["activities-heart"][0]["heartRateZones"][1]["minutes"]; 
    }
    for (var i = 0; i < 7; i++ )
    {
       if((heartList[i]["activities-heart"][0]["heartRateZones"][2]["minutes"])!= undefined) avgheartR3 += heartList[i]["activities-heart"][0]["heartRateZones"][2]["minutes"]; 
    }
    for (var i = 0; i < 7; i++ )
    {
       if ((heartList[i]["activities-heart"][0]["heartRateZones"][3]["minutes"])!= undefined) avgheartR4 += heartList[i]["activities-heart"][0]["heartRateZones"][3]["minutes"]; 
    }
    }catch(err) {
        console.log(err);
    }
    

    return [avgheartR1/7 , avgheartR2/7 , avgheartR3/7 ,avgheartR4/7];
    
}

module.exports = parseFitbitHeart;