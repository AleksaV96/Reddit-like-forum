(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('ThreadCtrl', ['$http', '$state', '$stateParams', 'loginService', function($http, $state, $stateParams, loginService) {
        var that = this;

        that.threads = [];
        that.thread = {};

        that.comments = [];
        that.comment = {};
        that.newComment = {};
        that.showComments = false;

        that.user = {};
        that.admin = false;
        that.logged = false;

        that.pullThreads = function() {
            $http.get('threads').then(function(response) {
                that.threads = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.fetchThread = function() {
            $http.get('threads/'+$stateParams.id).then(function(response) {
                    that.thread = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        that.deleteThread = function(id) {
            $http.delete('threads/' + id).then(function(response){
                that.pullThreads();
            },
            function(reason){
                console.log(reason)
            });
        };

        that.pullComments = function() {
            $http.get('threads/comments/' +$stateParams.id).then(function(response) {
                that.comments = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        that.showCom = function() {
            that.showComments = !that.showComments;
        }

        that.postComment = function(nc){

            that.comment = nc;
            that.comment.user_id = that.user.id;
            that.comment.thread_id = that.thread.id;

            $http.post('threads/comments/addComment', that.comment).then(function(response) {
                if(response.data["status"] == "done"){
                    that.newComment = null;
                    that.pullComments();
                }
            },
            function(reason){
                console.log(reason);
            });
        }

        that.fetchLoggedUser = function () {
            loginService.isLoggedIn(function () {
                loginService.getLoggedIn(function (user) {
                    that.user = user;
                    that.logged = true;
                    if(that.user.status == "admin")
                    {
                        that.admin = true;
                    }
                    else
                    {
                        that.admin = false;
                    }
                },
                function (errorReason) {
                    console.log(errorReason);
                })
            },
        );
        }

        that.fetchLoggedUser();
        that.fetchThread();
        that.pullComments();
        that.pullThreads();

    }]);
})(angular);
    
