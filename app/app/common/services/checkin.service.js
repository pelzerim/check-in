angular.module('myApp')
    .factory('CheckIn', ['$http', function ($http) {

        var urlBase = 'http://localhost:7000';
        var CheckIn = {};

        CheckIn.getPlanes = function () {
            return $http.get(urlBase+'/planes');
        };

        CheckIn.addPlane = function (p) {
            return $http.post(urlBase + '/plane', p);
        };

        return CheckIn;
    }]);