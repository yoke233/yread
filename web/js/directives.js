'use strict';

/* Directives */

angular.module('yRead.directives', []).
    directive('shortcut', function () {
        return {
            restrict: 'E',
            link: function postLink(scope, iElement, iAttrs) {
                var down = false;
                var dd = function (e) {
                    if (e.which == 13) {
                        scope.$apply(scope.keycDown(e,scope.index));
                    }
                    if(e.which == 37 || e.which == 39){
                        down = true;
                    }
                };
                var du = function (e) {
                    if(down && (e.which == 37 || e.which == 39)){
                        down = false;
                        scope.$apply(scope.keycDown(e,scope.index));
                    }
                };
                jQuery(document).on('keydown', dd);
                jQuery(document).on('keyup', du);
            }
        };
    });

