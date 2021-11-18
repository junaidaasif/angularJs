var myApp = angular.module('myCrud', []);

myApp.controller('myController', function ($scope, $http) {
    console.log("In myContoller...");

    $scope.newUser = {};
    $scope.checkedUser = {};
    $scope.message = "";

    $scope.users = []


    $http.get("http://localhost:3000/data")
        .then(function (response) {
            console.log(response.data)
            $scope.users = response.data
            console.log($scope.users)
        }, function (error) {
            console.error(error);
        })

    $scope.saveUser = function () {

        $http.post("http://localhost:3000/data", JSON.stringify($scope.newUser))
            .then(function (response) {
                console.log(response)
                $scope.message = "User added Successful";
                // href="#/!";
                window.location.href = '#/!';
            }, function (error) {
                console.log(error);

            })
    };

    $scope.selectUser = function (user) {
        console.log(user);
        $scope.clickedUser = user;
    };

    $scope.updateUser = function (id, user) {
        console.log("hello")
        $http.put(`http://localhost:3000/data/${id}`, (user))
            .then(function (response) {
                console.log(response)
                $scope.message = "User updated Successful";
            }, function (error) {
                console.log(error);

            })

    };

    $scope.deleteUser = function () {
        // $scope.users.splice($scope.users.indexOf($scope.clickedUser), 1);

        $http.delete(`http://localhost:3000/data/${$scope.clickedUser.id}`)
            .then(function (response) {
                console.log(response)
                $scope.message = "User deleted Successful";
            }, function (error) {
                console.log(error);

            })
    };
});

myApp.controller('logined', function ($scope, $http) {

    $scope.logInUser = {};
    users = [];
    $scope.message = "";
    var flag = 0;

    $scope.login = function () {
        $http.get("http://localhost:3000/data")
            .then(function (response) {
               
                users = response.data;
                for (x of users) {
                   
                    if (x.EMAIL == $scope.logInUser.EMAIL && x.FNAME == $scope.logInUser.FNAME) {
                        // $scope.message = "Login success"
                        alert("Success")
                        window.location.href = '#/!';
                        flag = 1;
                        break;
                    }


                }

                if (flag == 0) {
                    $scope.message = "Invalid cred"
                }

            }, function (error) {
                console.error(error);
            })
    }
})