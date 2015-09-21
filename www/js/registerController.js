/**
 * Created by Raul on 8/15/15.
 */

angular.module('controllers').controller('RegisterController', function($scope, $state, $timeout, $ionicLoading, mainFactory) {

    $scope.user = {};

    $scope.createAccount = function () {
        if (!$scope.user.email) {
            $scope.showMessage('Email cannot be empty!');
            $scope.hideMessage(1000);
            return;
        }
        if (!$scope.user.username) {
            $scope.showMessage('Username cannot be empty!');
            $scope.hideMessage(1000);
            return;
        }
        if (!$scope.user.password) {
            $scope.showMessage('Password cannot be empty!');
            $scope.hideMessage(1000);
            return;
        }
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!re.test($scope.user.email)) {
            $scope.showMessage('Invalid email format!', 1000);
            return;
        }
        $scope.showMessage("Registering user...");
        mainFactory.registerUser($scope.user).then(function () {
            $scope.showMessage("New user created successfully!");
            $scope.hideMessage(1000);
            $state.go('login');
        });
    };

    $scope.showMessage = function (message, time) {
        $ionicLoading.show({
            template: message
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, time);
    };

    $scope.hideMessage = function (time) {
        $timeout(function () {
            $ionicLoading.hide();
        }, time);
    };
});
