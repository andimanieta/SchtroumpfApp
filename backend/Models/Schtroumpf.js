const mongoose = require('mongoose');

const schtroumpfSchema = mongoose.Schema({
    name: { type : String, required: true},
    age: { type : Number, required: true},
    family: { type : String, required: true},
    food: { type : String, required: true},
    picture: { type : String, required: true},
    friends: [this]
});

module.exports = mongoose.model('Schtroumpf', schtroumpfSchema);
