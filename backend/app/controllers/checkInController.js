'use strict';

var io = require('../../server').io,
    mongoose = require('mongoose'),
    Plane = mongoose.model('Plane'),
    Passanger = mongoose.model('Passenger'),
    Seat = mongoose.model('Seat'),
    Helper = require("../utility/seatHelpers"),
    Timer = require("../utility/timer");

// GET /plane
exports.list_all_planes = function (req, res) {
    Plane.find({}, function (err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// GET /plane
exports.login = function (req, res) {
    new Passanger({name: "test", balance: "20"}).save(function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.list_all_the_seats = function (req, res) {
    Seat.find({}, function (err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// POST /plane
exports.add_a_plane = function (req, res) {

    var seats = [];
    //standart plane generator
    var planeWidth = 6;
    var planeLength = 40;
    for (var row = 1; row <= planeLength; row++) {
        for (var col = 1; col <= planeWidth; col++) {
            var type = Helper.type(row, col, planeWidth, planeLength);
            var seat = new Seat({
                _id: mongoose.Types.ObjectId(),
                nr: Helper.charInAlphabet(col) + "" + row,
                row: row,
                col: col,
                type: type,
                price: Helper.pricesForType(type)
            });
            seats.push(seat);
        }
    }
    req.body.seats = seats;

    var new_plane = new Plane(req.body);
    console.log(new_plane);
    new_plane.save(function (err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// GET /plane/{planeId}
exports.read_a_plane = function (req, res) {
    Plane.findById(req.params.planeId, function (err, plane) {
        if (err)
            res.send(err);
        res.json(plane);
    });
};

// Passangers
exports.list_all_passengers = function (req, res) {
    Plane.findById(req.params.planeId, function (err, plane) {
        if (err)
            res.send(err);
        res.json(plane.passengers);
    });
};

// check into plane
exports.add_passenger = function (req, res) {
    var user = req.body.user;
    var seat = req.body.seat;
    var plane = req.body.plane;

    if (user == undefined || plane == undefined) {
        res.status(400).send({
            message: 'Invalid request.'
        });
        return;
    }
    var getRandomSeat = false;
    if (!seat) {
        getRandomSeat = true;
    }

    Plane.findById(req.params.planeId, function (err, plane) {
        if (err)
            res.send(err);

        var doc = plane.passengers.id(user._id);

        // Passanger already on board
        if (doc) {
            res.status(400).send({
                message: 'You already boarded.'
            });
            return;
        }
        if (!getRandomSeat) {
            user.balance -= seat.price;
        }
        plane.passengers.push(user);


        plane.save(function (err, plne) {
            if (err) return err;
            // Update old seat
            if (getRandomSeat) {
                seat = Plane.find({"seats.reserved": false}).exec(function (err) {
                    if (err) {
                        res.status(400).send({
                            message: 'Internal server error'
                        });
                        return;
                    }
                    res.send(seat);
                })
            } else {
                Plane.findOneAndUpdate(
                    {"_id": plane._id, "seats._id": seat._id},
                    {
                        "$set": {
                            "seats.$.reserved": true,
                            "seats.$.paid": true
                        }
                    },
                    {new: true},
                    function (err, updatedPlane) {
                        if (err) {
                            res.status(400).send({
                                message: 'Internal server error'
                            });
                            return;
                        }
                        Timer.killTimer(seat);
                        var newSeat = updatedPlane.seats.id(req.params.seatId);
                        res.send(newSeat);
                    }
                );
            }

        });


    });
};

// Passangers
exports.list_all_seats = function (req, res) {
    Plane.findById(req.params.planeId, function (err, plane) {
        if (err)
            res.send(err);
        res.json(plane.seats);
    });
};

// GET /plane/{planeId}/seats/{seatId}
exports.read_seat = function (req, res) {
    Plane.findById(req.params.planeId, function (err, plane) {
        if (err)
            res.send(err);

        var doc = plane.seats.id(req.params.seatId);

        res.send(doc);

    });
};

exports.update_seat = function (req, res) {
    var user = req.body.user;
    var newSeat = req.body.seat;

    if (user == undefined || newSeat == undefined) {
        res.status(400).send({
            message: 'Invalid request.'
        });
        return;
    }


    Plane.findById(req.params.planeId, function (err, plane) {
        if (err)
            res.send(err);

        var seat = plane.seats.id(req.params.seatId);


        if (!seat) {
            res.status(400).send({
                message: 'Seat not found.'
            });
            return;
        }

        // validation, is reserved
        if (seat["reserved"]) {
            res.status(400).send({
                message: 'Already reserved'
            });
            return;
        }

        // Already on plane
        if (plane.passengers.id(user._id)) {
            res.status(400).send({
                message: 'You already boarded.'
            });
            return;
        }

        // enought money
        if (req.balance < seat.price) {
            res.status(400).send({
                message: 'Not enough money.'
            });
            return;
        }

        // Update old seat
        Plane.findOneAndUpdate(
            {"_id": req.params.planeId, "seats._id": req.params.seatId},
            {
                "$set": {
                    "seats.$.reserved": true
                }
            },
            {new: true},
            function (err, updatedPlane) {
                if (err) {
                    res.status(400).send({
                        message: 'Internal server error'
                    });
                    return;
                }

                Timer.timer(updatedPlane, seat);
                var newSeat = updatedPlane.seats.id(req.params.seatId);

                io.sockets.emit("plane:"+updatedPlane._id, user._id);
                res.send(updatedPlane);
            }
        );
    });
};

