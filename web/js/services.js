'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource']).
    factory('Phone', ['$resource', function ($resource) {
        return $resource('/web/phones/:phoneId.json', {}, {
            query: {
                method: 'GET',
                params: {
                    phoneId: 'phones'
                },
                isArray: true
            }
        });
    }]).
    factory('Directory', ['$resource', function ($resource) {
        return $resource('/api/dir/:BID', {}, {
            list: {
                method: 'GET',
                isArray: true
            }
        });
    }]).
    factory('Book', ['$resource', function ($resource) {
        return $resource('/api/book/:BID', {}, {
            list: {
                method: 'GET',
                params: {
                    BID: 'all'
                },
                isArray: true
            }
        });
    }]).
    factory('Article', ['$resource', function ($resource) {
        return $resource('/api/art/:AID', {}, {
        });
    }]);