(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('UserProfileCtrl', ['loginService', '$http',  '$state', 'Upload', '$scope', function (loginService, $http, $state, Upload, $scope) {
        var that = this;
        that.user = {};
        that.editUser = {};
        that.success = false;

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                    that.editUser = angular.copy(that.user);
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('login');
            });
        }


        that.changeProfile = function() {
            $http.put('/changeProfile', that.editUser).then(function(response){
                if(response.data["status"] == "done") {
                    that.fetchData();
                    that.success = true;
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        that.fetchData();
    }]);
})(angular);