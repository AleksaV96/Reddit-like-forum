(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('SubsCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        
        var that = this;

        that.subs = [];

        that.pullSubs = function() {
            $http.get('subs').then(function(response) {
                that.subs = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.pullSubs();

    }]);
})(angular);
