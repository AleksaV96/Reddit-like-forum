(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('AdminCtrl', ['loginService', '$http',  '$state', 'Upload', '$scope', function (loginService, $http, $state, Upload, $scope) {
        
        var that = this;

        that.users = [];
        that.subs = [];

        that.newSub = {};
        that.newSb = {};

        that.changeUser = {};
        that.changeSub = {};

        that.usersEditBool = false;
        that.subsEditBool = false;
        
        that.pullUsers = function() {
            $http.get('/adminPanel/users').then(function(response) {
                that.users = response.data;
            }, function(reason) {
                console.log(reason);
            });
        };

        that.pullSubs = function() {
            $http.get('subs').then(function(response) {
                that.subs = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.admChangeUser = function(user) {
            that.changeUser = user;
            $http.put('adminPanel/changeProfile', that.changeUser).then(function(response) {
                if(response.data["status"] == "done") {
                    that.pullUsers();
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        that.addNewSub = function(addNew){
            that.newSub = addNew;
            $http.post('/adminPanel/addSub', that.newSub).then(function(response) {
                if(response.data["status"] == "done"){
                    that.newSb = null;
                    that.pullSubs();
                }
            },
            function(reason){
                console.log(reason);
            });
        }

        that.admChangeSub = function(sub) {
            that.changeSub = sub;
            $http.put('adminPanel/changeSub', that.changeSub).then(function(response) {
                if(response.data["status"] == "done") {
                    that.pullSubs();
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        that.deleteUser = function(id) {
            $http.delete('adminPanel/deleteUser/' + id).then(function(response) {
                that.pullUsers();
            },
            function(reason){
                console.log(reason)
            });
        };

        that.deleteSub = function(id) {
            $http.delete('adminPanel/deleteSub/' + id).then(function(response) {
                that.pullSubs();
            },
            function(reason){
                console.log(reason)
            });
        };

        that.usersView = function() {
            that.usersEditBool = false;
        };
        
        that.usersEdit = function() {
            that.usersEditBool = true;
        };

        that.subsView = function() {
            that.subsEditBool = false;
        };
        
        that.subsEdit = function() {
            that.subsEditBool = true;
        };

        that.pullUsers();
        that.pullSubs();

    }]);
})(angular);