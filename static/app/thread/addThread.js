(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('AddThreadCtrl', ['loginService', '$http',  '$state', 'Upload', '$scope', function (loginService, $http, $state, Upload, $scope) {
        
        var that = this;
        
        that.subs = [];
        that.userId;
        that.newThread = {};
        that.success = false;

        that.fetchData = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.userId = user.id;
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
            function () {
                $state.go('login');
            });
        }

        that.pullSubs = function() {
            $http.get('subs').then(function(response) {
                that.subs = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.addNewThread = function(){
            
            that.newThread.user_id = that.userId;
            that.newThread["sub_id"] = that.newThread["sub"]["id"]

            $http.post('/threads/addThread', that.newThread).then(function(response) {
                if(response.data["status"] == "done"){
                    that.newThread = null;
                    that.success = true;
                }
            },
            function(reason){
                console.log(reason);
            });
        }

        that.fetchData();
        that.pullSubs();

    }]);
})(angular);