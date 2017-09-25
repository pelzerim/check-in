'use strict';

angular.module('myApp')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/checkin', {
            templateUrl: 'main/main.template.html',
            controller: 'MainCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/checkin'});
    }]);
