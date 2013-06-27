'use strict';

/* Controllers */

function DirectoryCtrl($scope, $routeParams, Directory) {
    $scope.articles = Directory.get({BID: $routeParams.BID}, function (art) {
        if(art.array){
            $scope.total = parseInt(art.array.length / 100);
            $scope.changePage(0);
        }
    });
    $scope.changePage = function (p) {
        var num = 4;
        var c = $scope.articles.array.slice(p * 100, (p + 1) * 100);
        var len = c.length / num;
        var out = [];
        for (var i = 0; i < len; i++) {
            out.push(c.slice(i * num, i * num + num));
        }
        $scope.arr = out;
    };
}
DirectoryCtrl.$inject = ['$scope', '$routeParams', 'Directory'];

function ArticleCtrl($scope, $location, $routeParams, Article) {
    var cc = 0;
    $scope.article = Article.get({
            AID: $routeParams.AID
        }, function (art) {
            $scope.last = '/art_' + art.book_id + '_' + (parseInt(art.index) - 1);
            $scope.next = '/art_' + art.book_id + '_' + (parseInt(art.index) + 1);
            $scope.dir = '/dir' + art.book_id;
            $scope.index = art.index;
            yRead.rootScope.pageTitle = art.title;
            cc = art.index;
            yRead.currentIndex = cc;
            console.log('loadOk'+cc);
        }
    );

    $scope.keycDown = function (e,id) {
        console.log(yRead.currentIndex+''+id);
        if(id != yRead.currentIndex){
            return;
        }
        if (e.which == 13) {
            //    $scope.keycDown = null;
            $location.path($scope.dir);
        } else if (e.which == 37) {
            yRead.loadOk = false;
            //    $scope.keycDown = null;
            $location.path($scope.last);
        } else if (e.which == 39) {
            yRead.loadOk = false;
            //    $scope.keycDown = null;
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


function ListCtrl($scope, Book) {
    $scope.books = Book.query();
    yRead.rootScope.pageTitle = '书列表';
}

ListCtrl.$inject = ['$scope', 'Book'];


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