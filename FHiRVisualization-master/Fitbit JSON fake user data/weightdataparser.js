function parseFitbitWeight(weight)
{
    var weightList = weight["weight"];
    var weightvalues = new Array();
    var bmivalues = new Array();
    var datesList = new Array();

    for (var i = 0; i < weightList.length; i++ )
    {
        weightvalues.push(weightList[i]["weight"]);
        bmivalues.push(weightList[i]["bmi"]);
        datesList.push(weightList[i]["date"]);
    }

    return [weightvalues,datesList,bmivalues];
}

module.exports = parseFitbitWeight;