(function() {

  'use strict';
  angular.module('authentication',[]).factory('authService', authService );

  function authService($http, $q, localStorageService,$state,$log,CONSTANT_DATA,jwtHelper) {
    // var serviceBase = 'http://localhost:65159/api/';

    var serviceBase = CONSTANT_DATA.oauth_url;

    //http://r2mworks.azurewebsites.net/
    //http://localhost:65159/api/
    var authServiceFactory = {};

    var _authentication = {
      isAuth: false,
      username : "",
      child_name : "",
      grade : "",
      child_name_set : false
    };

    var _fillAuthData = function () {
      var authData = localStorageService.get('authorizationData');
      if (authData) {
        _authentication.isAuth = true;
        _authentication.userName = authData.userName;
        var child_name = localStorageService.get('child_name');
        if(child_name) {
          _authentication.child_name_set = true;
          _authentication.child_name =localStorageService.get('child_name');
          _authentication.grade = localStorageService.get('grade');
        }
      }

    };

    var _saveRegistration = function (registration) {
      return $http.post(serviceBase + '  api/Account/Register', registration).then(function (response) {
        return response;
      });
    };


    var _login = function (loginData) {
      var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
      var deferred = $q.defer();
      console.log("calling the login service");
      $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
        $log.debug(response);
        // since the token issued is not a JWT.
    //    var tokenPayload = jwtHelper.decodeToken(response.data.access_token);
      //  $log.debug(tokenPayload);
        localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName});

        _authentication.isAuth = true;
        _authentication.username = response.userName;

        deferred.resolve(response);

      }).error(function (err, status) {
        _logOut();
        deferred.reject(err);
      });

      return deferred.promise;

    };
    var _login_local = function (loginData) {

        var promise = $http.get(CONSTANT_DATA.local_url + 'app/services/auth/token').then(function (response) {
        $log.debug(response.data.access_token);
       // var tokenPayload = jwtHelper.decodeToken(response.data.access_token);
      //  $log.debug(tokenPayload);
        localStorageService.set('authorizationData', { token: response.data.access_token, userName: "sookinoby"});

        _authentication.isAuth = true;
        _authentication.userName = "sookinoby";
      });

      return promise;

    };

    var _saveChildDetails = function (child_name,child_grade) {
       localStorageService.set("child_name", child_name);
       localStorageService.set("grade", child_grade);
       _authentication.child_name = child_name;
       _authentication.grade = child_grade;
      _authentication.child_name_set = true;
    };

    var _logOut = function () {
      localStorageService.remove('authorizationData');
      localStorageService.remove('child_name');
      localStorageService.remove('grade');
      _authentication.isAuth = false;
      _authentication.username =  null;
      _authentication.child_name = null;
      _authentication.grade = null
      _authentication.result = false;
      _authentication.child_name_set = false;
      console.log("logout called");
      $state.go("login");

    };



    authServiceFactory.saveRegistration = _saveRegistration;
    if(CONSTANT_DATA.mock_calls === true)
    {
    authServiceFactory.login = _login_local;
    }
    else {
      authServiceFactory.login = _login;
    }

    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.saveChildDetails = _saveChildDetails;
  //  authServiceFactory.postResult = _postResult;

    return authServiceFactory;
  }
})();
