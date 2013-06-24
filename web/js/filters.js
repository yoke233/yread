'use strict';

/* Filters */

angular.module('phonecatFilters', []).
    filter('checkmark', function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    }).
    filter('dirFilter', function () {
        return function (input, num) {
            var len = input.length / num;
            var out = [];
            for (var i = 0; i < len; i++) {
                out.push(input.slice(i * num, i * num + num));
            }
            return out;
        }
    });