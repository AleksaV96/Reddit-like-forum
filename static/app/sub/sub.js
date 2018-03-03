(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('SubCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        
        var that = this;
        that.subThreads = [];
        that.sub = {};

        that.user = {};
        that.admin = false;

        that.openSub = function() {
            $http.get('subs/getSub/'+$stateParams.id).then(function(response) {
                that.sub = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.openSubThreads = function() {
            $http.get('subs/'+$stateParams.id).then(function(response) {
                that.subThreads = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.sortSubThreadsAsc = function() {
            $http.get('subs/sort/'+$stateParams.id+'/asc').then(function(response) {
                that.subThreads = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.sortSubThreadsDesc = function() {
            $http.get('subs/sort/'+$stateParams.id+'/desc').then(function(response) {
                that.subThreads = response.data;
            }, function(reason) {
                console.log(reason);
            });
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
        );
        
        }

        that.deleteThread = function(id) {
            $http.delete('threads/' + id).then(function(response){
                that.openSubThreads();
            },
            function(reason){
                console.log(reason)
            });
        };


        that.fetchLoggedUser()
        that.openSub();
        that.openSubThreads();
  
    }]);
})(angular);