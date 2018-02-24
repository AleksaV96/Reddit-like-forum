(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('SubCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        
        var that = this;
        that.subThreads = [];

        that.openSubThreads = function() {
            $http.get('subs/'+$stateParams.id).then(function(response) {
                that.subThreads = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.openSubThreads();
  
    }]);
})(angular);