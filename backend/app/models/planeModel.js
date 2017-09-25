'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Plane = new Schema({
    name: {
        type: String
    },
    tailNr: {
        type: String
    },
    aircraftType: {
        type: String
    },
    destinationName: {
        type: String
    },
    departureName: {
        type: String
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    passengers: [{
        type: Schema.ObjectId,
        ref: 'Passenger'
    }],
    seats: [{
        type: Schema.ObjectId,
        ref: 'Seat'
    }]
});

module.exports = mongoose.model('Plane', Plane);