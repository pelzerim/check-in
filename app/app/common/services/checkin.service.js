angular.module('myApp')
    .factory('CheckIn', ['$http', function ($http) {

        var urlBase = 'http://localhost:7000';
        var CheckIn = {};

        CheckIn.currentPassanger = getRandomPerson();
        CheckIn.currentPlane = undefined;

        CheckIn.getPlanes = function () {
            return $http.get(urlBase+'/planes');
        };

        CheckIn.getPlane = function (planeId) {
            return $http.get(urlBase+'/planes/'+planeId);
        };

        CheckIn.addPlane = function (p) {
            return $http.post(urlBase + '/planes', p);
        };

        CheckIn.modifySeat = function (seat) {
            return $http.put(urlBase + '/planes/' + CheckIn.currentPlane._id + '/seats/' + seat.id + '/', seat);
        };

        function getRandomPerson() {
            return {
                name : "John Smith the " + Math.floor((Math.random() * 10000) + 1) + "th",
                balance : Math.floor((Math.random() * 20) + 5)
            }
        };

        return CheckIn;
    }]);