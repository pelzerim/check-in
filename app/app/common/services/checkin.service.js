angular.module('myApp')
    .factory('CheckIn', ['$http','$rootScope', function ($http,$rootScope) {

        var urlBase = 'http://localhost:7000';
        var CheckIn = {};

        getRandomPerson();
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
            var body = {
                seat : seat,
                user : CheckIn.currentPassanger
            };

            CheckIn.currentSeat = seat;
            return $http.put(urlBase + '/planes/' + CheckIn.currentPlane._id + '/seats/' + seat._id + '/',
                body);
        };

        CheckIn.checkIntoPlane = function (seat,plane) {
            var body = {
                seat : seat,
                user : CheckIn.currentPassanger,
                plane : CheckIn.currentPlane
            };

            return $http.post(urlBase + '/planes/' + CheckIn.currentPlane._id + '/passengers/',
                body);
        };

        function getRandomPerson() {
            return $http.get(urlBase+'/login/').then(function (user) {
                CheckIn.currentPassanger = user.data;
                console.log(CheckIn.currentPassanger);
                $rootScope.$broadcast('user:updated',user.data);
            });
        };

        return CheckIn;
    }]);