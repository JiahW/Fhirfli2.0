const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const FitbitSchema = new Schema({
    userId: {type: String, required: true},
    fitbitdata: {type: String, required: true},
    FitbitFHiRdata: {type: String, required: true},
    type: String
});


const Fitbit = mongoose.model('Fitbit', FitbitSchema);
module.exports = {
    fitbit: Fitbit,
};
