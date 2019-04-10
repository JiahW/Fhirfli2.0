function parseFitbitWeight(weight)
{
    var weightList = weight["weight"];
    var weightvalues = new Array();
    // weight["weight"][0]["weight"]
    for (i = 0; i < weightList.length; i++ )
    {
        weightvalues.push(weightList[i]["weight"]);
    }

    return weightvalues;
}

module.exports = parseFitbitWeight;