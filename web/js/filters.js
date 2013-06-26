'use strict';

/* Filters */

angular.module('phonecatFilters', []).
    filter('checkmark',function () {
        return function (input) {
            return input ? '\u2713' : '\u2718';
        };
    }).
    filter('range', function () {
        return function (input, min, max) {
            min = parseInt(min); //Make string input int
            max = parseInt(max);
            for (var i = min; i < max; i++)
                input.push(i);
            return input;
        };
    })

;