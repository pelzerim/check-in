var mongoose = require('mongoose'),
    Plane = mongoose.model('Plane'),
    Seat = mongoose.model('Seat');

var resevationTimers = {};

exports.killTimer = function (seat) {
    clearTimeout(resevationTimers[seat._id]);
}
exports.timer = function(plane,seat) {

    function myFunc(arg) {
        Plane.findById(plane._id, function(err, plane) {
            if (err) {
                console.log("error in timer", err);
                return;
            }

            // Update old seat
            Plane.findOneAndUpdate(
                {"_id": seat._id, "seats._id": seat._id},
                {
                    "$set": {
                        "seats.$.reserved": false
                    }
                },
                function (err, updatedPlane) {
                    if(err){
                        console.log("error resetting timer", err);
                    }
                }
            );
        });
    }
    resevationTimers[seat._id] = setTimeout(myFunc, 180000, 'Seat resevation timer for seat');
};