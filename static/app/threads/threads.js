(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ThreadCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        var that = this;

        that.threads = [];
        that.thread = {};

        that.user = {};
        that.admin = false;

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

        that.fetchLoggedUser = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                    if(that.user.status == "admin")
                    {
                        that.admin = true;
                    }
                    else
                    {
                        that.admin = false;
                    }
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('home');
            });
        }

        that.fetchLoggedUser();
        that.fetchThread();
        that.pullThreads();

    }]);
})(angular);
    
