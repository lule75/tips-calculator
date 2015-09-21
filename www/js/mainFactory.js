/**
 * Created by Raul on 8/15/15.
 */

/**
 * Created by Raul on 8/11/15.
 */

angular.module('services', []).factory('mainFactory', function($http, $q, $window) {
    var factory = { initFactory: false, connectionStr: "", url: "" };
    var apiDefer = null, apiUrl = null, proxy = null;
    factory.initApp = function () {
        // create a promise
        var deferred = $q.defer();
        var promise = deferred.promise;
        if (!factory.initFactory) {
            factory.initFactory = true;
            //factory.connectionStr = "http://192.168.1.127:5800/api/sql";
            //factory.url = "http://192.168.1.127:5800/api";
            factory.connectionStr = "http://intense-dawn-9976.herokuapp.com/api/sql";
            factory.url = "http://intense-dawn-9976.herokuapp.com/api";
            deferred.resolve(factory.initFactory);
        }
        else {
            deferred.resolve(factory.initFactory);
        }
        return promise;
    };

    factory.getUserDataFromFacebook = function (token) {
        return $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: token, fields: "id,name,gender,location,website,picture", format: "json" }});
    };

    factory.registerUser = function (user) {
        var request = {query: "INSERT INTO user_test (user_test_email, user_test_username, user_test_password) VALUES ('" + user.email + "', '" + user.username + "', '" + user.password + "')"};
        return $http.post(factory.connectionStr, request);
    };

    factory.loginUser = function (user) {
        var request = {query: "SELECT * FROM user_test WHERE user_test_username = '" + user.username + "' AND user_test_password = '" + user.password + "'"};
        return $http.post(factory.connectionStr, request);
    };

    factory.getUserByName = function (name) {
        var request = {query: "SELECT * FROM user_cook WHERE user_cook_name = '" + name + "'"};
        return $http.post(factory.connectionStr, request);
    };

    factory.getUsers = function () {
        var request = {query: "SELECT * FROM user_test"};
        return $http.post(factory.connectionStr, request);
    };

    return factory;
});