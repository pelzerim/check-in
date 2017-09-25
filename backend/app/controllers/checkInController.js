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
    var planeWidth = 6;
    var planeLength = 40;
    for (var row = 1; row <= planeLength; row++) {
        for (var col = 1; col <= planeWidth; col++) {
            var type = Helper.type(row,col,planeWidth, planeLength);
            seats.push({
                id: mongoose.Types.ObjectId(),
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
    Plane.findById(req.params.planeId, function(err, plane) {
        if (err)
            res.send(err);

        var seat = plane.seats.filter(function (s) {
            return s.id == req.params.seatId;
        }).pop();

        res.send(seat);

    });
};

exports.update_seat = function(req, res) {
    // Validation

    // Plane.findById(req.params.planeId, function(err, plane) {
    //     if (err)
    //         res.send(err);
    //
    //     var seat = plane.seats.filter(function (s) {
    //         return s.id == req.params.seatId;
    //     }).pop();
    //
    //     res.send(plane);
    //
    // });

    Plane.findById(req.params.planeId, function(err, plane) {
        if (err)
            res.send(err);

        var seat = plane.seats.filter(function (s) {
            return s.id == req.params.seatId;
        }).pop();

        // validation, is reserved
        if (seat.reserved) {
            res.status(500).send('Already reserved');
        }
        // Already on plane
        var found = false;
        for(var i = 0; i < plane.passengers.length; i++) {
            if (plane.passengers[i].name == req.name) {
                found = true;
                break;
            }
        }
        if (found) {
            res.status(500).send('Already boarded');
        }

        // enought money
        if (req.balance < seat.price) {
            res.status(500).send('Too poor');
        }


        Plane.findOneAndUpdate(
            { "_id": req.params.planeId, "seats.id": req.params.seatId },
            {
                "$set": {
                    "seats.$.reserved": req.body.reserved,
                    "seats.$.paid" : req.body.paid
                }
            },
            function(err,doc) {
                if (err)
                    res.send(err);
                var seat = doc.seats.filter(function (s) {
                    return s.id == req.params.seatId;
                }).pop();


                // make unreserved after 5 minutes
                setTimeout(function(){
                        Plane.findById(req.params.planeId, function(err, plane) {
                            if (err)
                                res.send(err);

                            var seat = plane.seats.filter(function (s) {
                                return s.id == req.params.seatId;
                            }).pop();

                            if (!seat.paid) {
                                Plane.findOneAndUpdate(
                                    { "_id": req.params.planeId, "seats.id": req.params.seatId },
                                    {
                                        "$set": {
                                            "seats.$.reserved": false
                                        }
                                    },
                                    function(err,doc) {

                                    });
                            }

                        });
                    }
                    , 180000);


                res.send(seat);
            }
        );
    });
};

