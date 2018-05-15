var app = angular.module('todoapp', []);

app.controller('appCtrl', function($scope, $http) {
    $scope.name = "John";
    $scope.todoList = {}
    /**
     * TODO:
     * 1.use $http to call backend rest API
     * GET todos(Which is corresponding to index() function inside TodoController)(AJAX CALL)
     * 2.store all data in todolist variable, then use ng-repeat to show a list(using ul li tag) in index.html
     */
    $http.get('http://localhost/201805CodeTesting/backend/public/api/todos')
        .success(function (data, status, header, config){
            $scope.todoList = data;
    });

    /**
     * TODO:
     * 1.Each task can be delete. when user click(need to create event handler) on that task.
     * 2.Send delete request to rest API to delete it in mysql database.(AJAX CALL)
     */
    $scope.deleteTask = function(id) {
        $http.delete('http://localhost/201805CodeTesting/backend/public/api/todos/' + id).
            success(function(data, status, headers, config) {
               $scope.ServerResponse = id;
            });
    }

    /**
     * TODO:
     * 1.create a form under the todo list
     * 2.user create a new todo task; send data to backend rest API
     * 3.store the new todo task in database and return the new list
     * 4.update $scope.todoList with the API returned new list
     */
    $scope.addTask =  function() {
        var data = $.param({
            taskName: $scope.taskName,
        });

        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        $http.post('http://localhost/201805CodeTesting/backend/public/api/todos', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
    };


    /**
     * optional tasks:
     * 1.edit todo task
     */
});