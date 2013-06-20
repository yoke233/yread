'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/phones', {
            templateUrl: '/web/partials/phone-list.html',
            controller: PhoneListCtrl
        }).
        when('/phones/:phoneId', {
            templateUrl: '/web/partials/phone-detail.html',
            controller: PhoneDetailCtrl
        }).
        otherwise({
            redirectTo: '/phones'
        });
    }
]);