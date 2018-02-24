(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('RegistrationCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        var that = this;

        that.newUser = {
            "username" : "",
            "email" : "",
            "password" : ""
        }

        that.addUser = function() {
            $http.post('registration', that.newUser).then(function(response){
                if(response.data["status"] == "done"){
                }
            },
            function(reason){
                console.log(reason);
            });
        }

   }]);
})(angular);