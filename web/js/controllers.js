'use strict';

/* Controllers */

function PhoneListCtrl($scope) {
  $http.get('http://127.0.0.1/web/phones/phones.json').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'age';
}