PlaneChangeSeat.$inject = ['CheckIn', 'socket']; // e.g. 'Chat'

function PlaneChangeSeat (CheckIn, socket) { // e.g. (Chat)
    var ctrl = this;

    // This would have been the change seat component
}

angular.module('myApp').component('planeChangeSeat', {
    templateUrl: 'common/components/change-seat/change-seat.template.html',
    controller: PlaneChangeSeat,
    bindings :{
        didChangeSeat : '&'
    }
});
