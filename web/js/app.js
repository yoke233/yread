'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices', 'yRead.directives', 'ngSanitize', 'ui.keypress']).
    config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider.
                when('/phones', {
                    templateUrl: '/web/partials/phone-list.html',
                    controller: PhoneListCtrl
                }).
                when('/dir:BID', {
                    templateUrl: '/web/tpl/directory.html',
                    controller: DirectoryCtrl
                }).
                when('/art_:AID', {
                    templateUrl: '/web/tpl/article.html',
                    controller: ArticleCtrl
                }).
                when('/phones/:phoneId', {
                    templateUrl: '/web/partials/phone-detail.html',
                    controller: PhoneDetailCtrl
                }).
                otherwise({
                    redirectTo: '/phones'
                });
        }
    ]).
    run(['$rootScope', function ($rootScope) {
        window.yRead = {};
        yRead.rootScope = $rootScope;
        yRead.rootScope.pageTitle = "Reader yoke's";
    }]);