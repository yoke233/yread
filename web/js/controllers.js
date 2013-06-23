'use strict';

/* Controllers */

function DirectoryCtrl($scope, $routeParams, Directory) {
    $scope.articles = Directory.get({BID:$routeParams.BID});
}
DirectoryCtrl.$inject = ['$scope', '$routeParams', 'Directory'];

function ArticleCtrl($scope, $routeParams, Article) {
    $scope.article = Article.get({AID:$routeParams.AID});
}
ArticleCtrl.$inject = ['$scope', '$routeParams', 'Article'];

function PhoneListCtrl($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
}

PhoneListCtrl.$inject = ['$scope', 'Phone'];


function PhoneDetailCtrl($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({
        phoneId: $routeParams.phoneId
    }, function (phone) {
        $scope.mainImageUrl = '/web/' + phone.images[0];
    });

    $scope.setImage = function (imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}

PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];