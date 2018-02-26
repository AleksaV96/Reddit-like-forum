(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('NavbarCtrl', ['loginService', '$state', '$scope', function(loginService, $state, $scope) {
        var that = this;
        that.loggedIn = false;
        that.user = {};

        var onLogin = function() {
            that.loggedIn = true;
        }

        var onLogout = function() {
            that.loggedIn = false;
        }

        loginService.addLoginListener($scope, onLogin);
        loginService.addLogoutListener($scope, onLogout);

        that.logout = function() {
            loginService.logout(function(){
                $state.go('home');
            }, function(){});
        }

        loginService.isLoggedIn(function() {
            that.loggedIn = true;
        },
        function() {
            that.loggedIn = false;
        });

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
                $state.go('home');
            });
        }

        that.fetchData();

    }]);
})(angular);