'use strict';

var mongoose = require('mongoose'),
    Plane = mongoose.model('Plane'),
    Passanger = mongoose.model('Passenger'),
    Seat = mongoose.model('Seat'),
    Helper = require("../utility/seatHelpers")

// GET /plane
exports.list_all_planes = function(req, res) {
    Plane.find({}, function(err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// POST /plane
exports.add_a_plane = function(req, res) {
    var new_plane = new Plane(req.body);
    var seats = [];
    //standart plane generator
    var planeWidth =6;
    var planeLength = 40;
    for (var row = 1; row <= planeWidth; row++) {
        for (var col = 1; col <= planeLength; col++) {
            var type = Helper.type(row,col,planeWidth, planeLength);
            seats.push({
                nr: Helper.charInAlphabet(col) + "" + row,
                row : row,
                col : col,
                type :type,
                price : Helper.pricesForType(type)
            });
        }
    }
    new_plane.seats = seats;

    new_plane.save(function(err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// GET /plane/{planeId}
exports.read_a_plane = function(req, res) {
    Plane.findById(req.params.planeId, function(err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// Passangers
exports.list_all_passengers = function(req, res) {
    Plane.findById(req.params.planeId, function(err, plane) {
        if (err)
            res.send(err);
        res.json(plane.passengers);
    });
};


exports.add_passenger = function(req, res) {
    var new_passenger = new Passanger(req.body);
    new_passenger.save(function(err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// Passangers
exports.list_all_seats = function(req, res) {
    Plane.findById(req.params.planeId, function(err, plane) {
        if (err)
            res.send(err);
        res.json(plane.seats);
    });
};

// GET /plane/{planeId}/seats/{seatId}
exports.read_seat = function(req, res) {
    Seat.findById(req.params.seatId, function(err, seat) {
        if (err) {
            res.send(err);
        } else {
            res.json(seat);
        }
    });
};

exports.update_seat = function(req, res) {
    // Validation
    Task.findOneAndUpdate(
        {_id: req.params.seatId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

