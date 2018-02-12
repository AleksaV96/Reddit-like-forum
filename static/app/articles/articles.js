(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ArticleListCtrl', ['$http', function($http) {
        var that = this;

        that.articles = []

        that.fetchArticles = function() {
            $http.get('articles').then(
                function(response) {
                    that.articles = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        that.fetchArticles()
    }]);
})(angular);