/**
 * Created by immanuelpelzer on 24.09.17.
 */
PlaneListCtrl.$inject = ['CheckIn']; // e.g. 'Chat'

function PlaneListCtrl (CheckIn) { // e.g. (Chat)
    var ctrl = this;

    CheckIn.getPlanes().then(function (res) {
        console.log(res.data);
        ctrl.planes = res.data;
    }).catch(function (err) {
        ctrl.errorMessage = "Could not fetch planes, please reload.";
    });

    ctrl.selectPlane = function(plane) {
        ctrl.onSelectedPlane(plane);
    }
}

angular.module('myApp').component('planeList', {
    templateUrl: 'common/components/plane-list/plane-list.template.html',
    controller: PlaneListCtrl,
    bindings: { // see https://docs.angularjs.org/guide/component
        onSelectedPlane : '&' // function callbacks
    }
});
