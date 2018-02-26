(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('UserProfileCtrl', ['loginService', '$state', 'Upload', '$scope', function (loginService, $state, Upload, $scope) {
        var that = this;
        that.user = {};
        that.editUser = {};

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('login');
            });
        }

        that.updateUser = function () {
            Upload.upload({
                url: 'users/' + that.editUser.id,
                method: 'PUT',
            },
            function (reason) {
                console.log(reason);
            });
        }

        that.fetchData();
    }]);
})(angular);