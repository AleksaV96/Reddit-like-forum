(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('RegistrationCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        var that = this;

        that.passwordMismatch = false;
        that.registrationSuccess = false;
        that.newUser = {
            "name" : "",
            "surname" : "",
            "username" : "",
            "email" : "",
            "password" : "",
            "passwordTest" : ""
        }

        that.addUser = function() {
            that.passwordMismatch = false;
            if(that.newUser.password == that.newUser.passwordTest){
            $http.post('registration', that.newUser).then(function(response){
                if(response.data["status"] == "done"){
                that.registrationSuccess = true;
                }
            },
            function(reason){
                console.log(reason);
            });
            }
            else{
                that.passwordMismatch = true;
            }
        }

   }]);
})(angular);