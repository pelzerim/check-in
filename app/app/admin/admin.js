angular.module('admin', [])
    .controller('AdminCtrl',
        ['$scope', 'CheckIn', // injections
            AdminCtrl]
    );

function AdminCtrl($scope, CheckIn) {
    $scope.currentPlane;

    $scope.$on('user:updated', function(event,data) {
        $scope.currentPassanger = CheckIn.currentPassanger;
        $scope.currentPassanger.name = "Admin";

    });
    
    $scope.addPlane = function (newPlane) {
        CheckIn.addPlane(newPlane).then(function (np) {
            $scope.$broadcast("loadNewPlanes");
        })
    };

    $scope.showPlane = function () {
        $scope.currentPlane = CheckIn.currentPlane;
    };

    $scope.home = function() {
        $scope.currentPlane = undefined;
    };
}/**
 * Created by immanuelpelzer on 26.09.17.
 */
