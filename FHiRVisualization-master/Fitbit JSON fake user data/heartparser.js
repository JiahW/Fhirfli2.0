function parseFitbitHeart(heart)
{
    var heartList = heart["days"];
    // console.log("heartList.length::   "+heartList.length);
    // var heartR1 = new Array();
    // var heartR2 = new Array();
    // var heartR3 = new Array();
    // var heartR4 = new Array();

    var avgheartR1 = 0;
    var avgheartR2 = 0;
    var avgheartR3 = 0;
    var avgheartR4 = 0;
    

    for (var i = 0; i < 7; i++ )
    {
        // heartR1.push(heartList[i]["activities-heart"][0]["heartRateZones"][0]["minutes"]);
        avgheartR1 += heartList[i]["activities-heart"][0]["heartRateZones"][0]["minutes"]; 
    }
    for (var i = 0; i < 7; i++ )
    {
        // heartR2.push(heartList[i]["activities-heart"][0]["heartRateZones"][1]["minutes"]);
        avgheartR2 += heartList[i]["activities-heart"][0]["heartRateZones"][1]["minutes"]; 
    }
    for (var i = 0; i < 7; i++ )
    {
        // heartR3.push(heartList[i]["activities-heart"][0]["heartRateZones"][2]["minutes"]);
        avgheartR3 += heartList[i]["activities-heart"][0]["heartRateZones"][2]["minutes"]; 
    }
    for (var i = 0; i < 7; i++ )
    {
        // heartR4.push(heartList[i]["activities-heart"][0]["heartRateZones"][3]["minutes"]);
        avgheartR4 += heartList[i]["activities-heart"][0]["heartRateZones"][3]["minutes"]; 
    }

    
    return [avgheartR1/7 , avgheartR2/7 , avgheartR3/7 ,avgheartR4/7];
}

module.exports = parseFitbitHeart;