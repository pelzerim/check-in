PlaneChooseCtrl.$inject = ['CheckIn']; // e.g. 'Chat'

function PlaneChooseCtrl (CheckIn) { // e.g. (Chat)
    var ctrl = this;
    ctrl.currentPlane = CheckIn.currentPlane;
    ctrl.errorMessage = undefined;
    ctrl.showSeats = true;
    ctrl.mySeat = undefined;

    ctrl.reserveSeat = function (seat) {
        ctrl.showSeats = false;
        ctrl.loading = true;
        seat.reserved = true;
        CheckIn.modifySeat(seat).then(function (res) {
            ctrl.loading = false;
            ctrl.showPay = true;
            ctrl.mySeat = seat;
        }).catch(function (err) {
            ctrl.loading = false;
            ctrl.showSeats = true;
            ctrl.errorMessage = err.data.message;
        });
    };
    
    ctrl.didPay = function () {
        ctrl.showPay = false;
        ctrl.true = false;
        CheckIn.checkIntoPlane(ctrl.mySeat).then(function (res) {
            console.log(res);
            ctrl.loading = false;
        }).catch(function (err) {
            ctrl.loading = false;
            ctrl.showSeats = true;
            ctrl.errorMessage = err.data.message;
        });
    };

}

angular.module('myApp').component('planeChoose', {
    templateUrl: 'common/components/plane-choose-seat/plane-choose.template.html',
    controller: PlaneChooseCtrl
});
