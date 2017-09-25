/**
 * Created by immanuelpelzer on 24.09.17.
 */
PlaneListCtrl.$inject = ['CheckIn', '$scope']; // e.g. 'Chat'

function PlaneListCtrl (CheckIn,$scope) { // e.g. (Chat)
    var ctrl = this;

    ctrl.loadPlanes = function () {
        CheckIn.getPlanes().then(function (res) {
            ctrl.planes = res.data;
            ctrl.errorMessage ="";
        }).catch(function (err) {
            ctrl.errorMessage = "Could not fetch planes, please reload.";
        });
    };
    ctrl.loadPlanes();

    $scope.$on("loadNewPlanes",function(){
        ctrl.loadPlanes();
    });

    ctrl.selectPlane = function(plane) {
        CheckIn.currentPlane = plane;
        ctrl.onSelectedPlane();
    }
}

angular.module('myApp').component('planeList', {
    templateUrl: 'common/components/plane-list/plane-list.template.html',
    controller: PlaneListCtrl,
    bindings: { // see https://docs.angularjs.org/guide/component
        onSelectedPlane : '&' // function callbacks
    }
});
