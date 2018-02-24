(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ThreadCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        var that = this;

        that.threads = []
        that.thread = {}

        that.pullThreads = function() {
            $http.get('threads').then(function(response) {
                that.threads = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.fetchThread = function() {
            $http.get('threads/'+$stateParams.id).then(function(response) {
                    that.thread = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        that.fetchThread();
        that.pullThreads();

    }]);
})(angular);
    
