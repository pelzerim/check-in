PlaneChooseCtrl.$inject = ['CheckIn']; // e.g. 'Chat'

function PlaneChooseCtrl (CheckIn) { // e.g. (Chat)
    var ctrl = this;
    ctrl.currentPlane = CheckIn.currentPlane;
    ctrl.errorMessage = undefined;
    ctrl.showSeats = true;
    
    
    ctrl.reserveSeat = function (seat) {
        ctrl.showSeats = false;
        ctrl.loading = true;
        CheckIn.modifySeat(seat).then(function (res) {
            console.log(res);
        }).catch(function (err) {
            ctrl.errorMessage = "Could not fetch planes, please reload.";
        });

    };

    // ctrl.seats = [[]];
    // ctrl.currentPlane.seats.forEach(function(seat) {
    //     if (seat.row && seat.col) {
    //         console.log(seat);
    //         console.log(ctrl.seats);
    //         ctrl.seats[seat.col - 1][seat.row -1] = seat;
    //         console.log(ctrl.seats[seat.row - 1][seat.col -1]);
    //     }
    // });
    // console.log(ctrl.seats);
}

angular.module('myApp').component('planeChoose', {
    templateUrl: 'common/components/plane-choose-seat/plane-choose.template.html',
    controller: PlaneChooseCtrl
});
