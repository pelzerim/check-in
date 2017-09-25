PlaneChooseCtrl.$inject = ['CheckIn', 'socket']; // e.g. 'Chat'

function PlaneChooseCtrl (CheckIn, socket) { // e.g. (Chat)
    var ctrl = this;
    ctrl.currentPlane = CheckIn.currentPlane;
    ctrl.errorMessage = undefined;
    ctrl.showSeats = true;
    ctrl.mySeat = undefined;

    socket.on("plane:" +ctrl.currentPlane._id, function(data){
        ctrl.showSeats = false;
        if (data != CheckIn.currentPassanger._id) {
            CheckIn.getPlane(ctrl.currentPlane._id).then(function (plane) {
                ctrl.showSeats = true;
                CheckIn.currentPlane = plane.data;
                ctrl.currentPlane = plane.data;
            }).catch(function (err) {
                ctrl.errorMessage = err.data.message;
            });
        }
    });

    ctrl.reserveSeat = function (seat) {
        ctrl.showSeats = false;
        ctrl.loading = true;

        seat.reserved = true;
        CheckIn.modifySeat(seat).then(function (res) {
            ctrl.loading = false;
            ctrl.showPay = true;
            ctrl.mySeat = seat;
            ctrl.errorMessage = ""
        }).catch(function (err) {
            ctrl.loading = false;
            ctrl.showSeats = true;
            ctrl.errorMessage = err.data.message;
        });
    };
    
    ctrl.didPay = function () {
        ctrl.showPay = false;
        ctrl.true = false;
        ctrl.showSeats = false;
        CheckIn.checkIntoPlane(ctrl.mySeat).then(function (res) {
            ctrl.message = "You are now checked in."
            ctrl.loading = false;
            ctrl.errorMessage = ""
        }).catch(function (err) {
            ctrl.loading = false;
            ctrl.showSeats = true;
            ctrl.errorMessage = err.data.message;
        });
    };

}

angular.module('myApp').component('planeChoose', {
    templateUrl: 'common/components/plane-choose-seat/plane-choose.template.html',
    controller: PlaneChooseCtrl,
    bindings :{
        asAdmin : '<'
    }
});
