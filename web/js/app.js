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
                when('/list', {
                    templateUrl: '/web/tpl/list.html',
                    controller: ListCtrl
                }).
                when('/phones/:phoneId', {
                    templateUrl: '/web/partials/phone-detail.html',
                    controller: PhoneDetailCtrl
                }).
                otherwise({
                    redirectTo: '/list'
                });
        }
    ]).
    run(['$rootScope', function ($rootScope) {
        window.yRead = {};
        yRead.rootScope = $rootScope;
        yRead.rootScope.pageTitle = "yoke's Reader";
        
        $rootScope.asdasd = function (){
            if ($) {
                var dom = $('#alerts-container');
                var $toast = $('#toast-example1').clone();
                dom.append($toast.addClass('in'));
            }else{
                alert('aaa');
            }
        }
    }]);