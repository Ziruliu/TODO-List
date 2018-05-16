var app = angular.module('todoapp', []);

app.controller('appCtrl', function($scope, $http) {
    $scope.todoList = {};
    $scope.task = "";
    /**
     * TODO:
     * 1.use $http to call backend rest API
     * GET todos(Which is corresponding to index() function inside TodoController)(AJAX CALL)
     * 2.store all data in todolist variable, then use ng-repeat to show a list(using ul li tag) in index.html
     */
    var getTodo = function() {
        $http.get('http://localhost/201805CodeTesting/backend/public/api/todos')
            .then(function(response) {
                $scope.todoList = response.data;
            }, function(response) {
                $scope.todoList = "Something went wrong"
            });
    }

    getTodo();

    /**
     * TODO:
     * 1.Each task can be delete. when user click(need to create event handler) on that task.
     * 2.Send delete request to rest API to delete it in mysql database.(AJAX CALL)
     */
    $scope.deleteTask = function(id) {
        $http.delete('http://localhost/201805CodeTesting/backend/public/api/todos/' + id).
            then(function(response) {
               $scope.msg = "Successfully Deleted";
               $scope.todoList.splice(id, 1);
               getTodo();
        }, function(response) {
            $scope.msg = "Something went wrong";
        });
    }

    /**
     * TODO:
     * 1.create a form under the todo list
     * 2.user create a new todo task; send data to backend rest API
     * 3.store the new todo task in database and return the new list
     * 4.update $scope.todoList with the API returned new list
     */

    $scope.addTask = function() {
        var data = {
            task:$scope.task
        }
        $http.post('http://localhost/201805CodeTesting/backend/public/api/todos', data)
            .then(function(response) {
                $scope.msg = "Successfully Added"
                getTodo();
                $scope.todoList.push({
                    id: response.data.id,
                    task: task,
                    status: response.data.status
                });
            }, function(response){
                $scope.msg = "Something went wrong"
            })
    };


    /**
     * optional tasks:
     * 1.edit todo task
     */
});