(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ProfileCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        
        var that = this;

        that.profile = {};

        that.getProfile = function() {
            $http.get('user/'+$stateParams.username).then(function(response) {
                    that.profile = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        that.getProfile();

    }]);
})(angular);