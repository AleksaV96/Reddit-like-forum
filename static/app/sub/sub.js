(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('SubCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        
        var that = this;
        that.subThreads = [];

        that.user = {};
        that.admin = false;

        that.openSubThreads = function() {
            $http.get('subs/'+$stateParams.id).then(function(response) {
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


        that.fetchLoggedUser()
        that.openSubThreads();
  
    }]);
})(angular);