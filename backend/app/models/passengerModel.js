'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Passenger = new Schema({
    name: {
        type: String
    },
    balance : {
        type: Number
    },
    seat : {
        type: Schema.ObjectId,
        ref: 'Seat'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Passenger', Passenger);