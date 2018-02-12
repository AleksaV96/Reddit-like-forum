(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ThreadListCtrl', ['$http', function($http) {
        var that = this;

        that.threads = []

        that.pullThreads = function() {
            $http.get('threads').then(function(response) {
                that.threads = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.pullThreads();
    }]);
})(angular);
    
