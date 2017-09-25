'use strict';

angular.module('myApp')
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/checkin', {
            templateUrl: 'main/main.template.html',
            controller: 'MainCtrl'
        });

        $routeProvider.when('/admin', {
            templateUrl: 'admin/admin.template.html',
            controller: 'AdminCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/checkin'});
    }]);
