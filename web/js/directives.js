'use strict';

/* Directives */

angular.module('yRead.directives', []).
    directive('shortcut', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            link: function postLink(scope, iElement, iAttrs) {
                jQuery(document).on('keydown', function (e) {
                    if (e.which == 13 || e.which == 37 || e.which == 39) {
                        scope.$apply(scope.keycDown(e));
                    }
                });
            }
        };
    });

