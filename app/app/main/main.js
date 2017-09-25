/**
 * Created by immanuelpelzer on 24.09.17.
 */

angular.module('main', [])
    .controller('MainCtrl',
        ['$scope', 'CheckIn', // injections
        MainCtrl]
    );

function MainCtrl($scope, CheckIn) {
    $scope.currentPlane;

    $scope.currentPassanger = CheckIn.currentPassanger;

    $scope.showPlane = function () {
        $scope.currentPlane = CheckIn.currentPlane;
    }
}