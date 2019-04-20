function stepsdataparser(steps)
{
    // console.log(steps);
    var stepsList = steps["activities-steps"];
    var stepsvalues = new Array();
    var datesList = new Array();
    console.log(stepsList);
    // console.log(stepsList[1]["value"]);

    for (var i = 0; i < stepsList.length; i++ )
    {
        // console.log(stepsList[i]);
        stepsvalues.push(stepsList[i]["value"]);
        datesList.push(stepsList[i]["dateTime"]);
    }

    return [stepsvalues,datesList];
}

module.exports = stepsdataparser;