var mongoose = require('mongoose'),
    Plane = mongoose.model('Plane'),
    Seat = mongoose.model('Seat'),
    app = require("../../server").app,
    server = require('http').Server(app),
    io = require('socket.io')(server);

var resevationTimers = {};

exports.killTimer = function (seat) {
    clearTimeout(resevationTimers[seat._id]);
}
exports.timer = function(plane,seat) {

    function makeSeatAvailable(arg) {
        Plane.findById(plane._id, function(err, plane) {
            if (err) {
                console.log("error in timer", err);
                return;
            }

            // Update old seat
            Plane.findOneAndUpdate(
                {"_id": plane._id, "seats._id": seat._id},
                {
                    "$set": {
                        "seats.$.reserved": false
                    }
                },
                function (err, updatedPlane) {
                    if(err){
                        console.log("error resetting timer", err);
                    }
                    io.sockets.emit("plane:"+plane._id, {});

                }
            );
        });
    }
    resevationTimers[seat._id] = setTimeout(makeSeatAvailable, 180000, 'Seat resevation timer for seat');
};