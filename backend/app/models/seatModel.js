'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Seat', Seat);