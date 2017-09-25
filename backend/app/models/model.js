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

var Seat = new Schema({
    nr: {
        type: String
    },
    row : {
        type: Number
    },
    col : {
        type: Number
    },
    type: {
        type: [{
            type: String,
            enum: ['free', 'window', 'ailse', 'leg']
        }],
        default: ['free']
    },
    reserved : {
        type : Boolean,
        default: false
    },
    paid: {
        type : Boolean,
        default: false
    },
    price: {
        type : Number,
        default : 0
    },
    passenger: {
        type: Schema.ObjectId,
        ref: 'Passenger'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
});

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
    passengers: [Passenger],
    seats: [Seat]
});

module.exports = mongoose.model('Seat', Seat);
module.exports = mongoose.model('Passenger', Passenger);
module.exports = mongoose.model('Plane', Plane);