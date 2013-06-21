'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
config(['$routeProvider','$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/web/partials/phone-list.html',
            controller: PhoneListCtrl
        }).
        when('/phones/:phoneId', {
            templateUrl: '/web/partials/phone-detail.html',
            controller: PhoneDetailCtrl
        }).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }
]);