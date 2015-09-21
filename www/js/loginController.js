/**
 * Created by Raul on 8/15/15.
 */

angular.module('controllers').controller('LoginController', function($scope, $state, $timeout, $ionicLoading, mainFactory) {

    $scope.modelGUI = {};

    $scope.loginUser = function () {
        if (!$scope.modelGUI.username) {
            $scope.showMessage('Username cannot be empty!', 1000);
            return;
        }
        if (!$scope.modelGUI.password) {
            $scope.showMessage('Password cannot be empty!', 1000);
            return;
        }
        mainFactory.loginUser($scope.modelGUI).then(function (resp) {
            if (resp.data.length > 0) {
                $scope.showMessage('Login successfully!', 500);
                $state.go('app.search');
            }
            else {
                $scope.showMessage('Incorrect username or password!', 1000);
            }
        })
        .catch(function () {

        });
    };

    $scope.goToRegisterPage = function () {
        $state.go('register');
    };

    $scope.showMessage = function (message, time) {
        $ionicLoading.show({
            template: message
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, time);
    };
});
