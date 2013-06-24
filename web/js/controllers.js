'use strict';

/* Controllers */

function DirectoryCtrl($scope, $routeParams, Directory) {
    $scope.articles = Directory.get({BID: $routeParams.BID});
}
DirectoryCtrl.$inject = ['$scope', '$routeParams', 'Directory'];

function ArticleCtrl($scope, $location, $routeParams, Article) {
    $scope.article = Article.get({
            AID: $routeParams.AID
        }, function (art) {
            $scope.last = '/art_' + art.book_id + '_' + (parseInt(art.index) - 1);
            $scope.next = '/art_' + art.book_id + '_' + (parseInt(art.index) + 1);
            $scope.dir = '/dir' + art.book_id;
            yRead.rootScope.pageTitle = art.title;
        }
    );

    $scope.keycDown = function (e) {
        alert(e.which);
        if (e.which == 13) {
            $location.path($scope.dir);
        } else if (e.which == 37) {
            $location.path($scope.last);
        } else if (e.which == 39) {
            $location.path($scope.next);
        }
    };
}
ArticleCtrl.$inject = ['$scope', '$location' , '$routeParams', 'Article'];

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