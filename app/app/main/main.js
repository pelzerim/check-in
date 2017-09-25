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

    $scope.$on('user:updated', function(event,data) {
        $scope.currentPassanger = CheckIn.currentPassanger;
    });

    $scope.showPlane = function () {
        $scope.currentPlane = CheckIn.currentPlane;
    };

    $scope.home = function() {
        $scope.currentPlane = undefined;
    };
}