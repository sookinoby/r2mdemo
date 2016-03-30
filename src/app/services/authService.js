(function() {

  'use strict';
  angular.module('authentication',[]).factory('authService', authService );

  function authService($http, $q, localStorageService,$state,$log,CONSTANT_DATA) {
    // var serviceBase = 'http://localhost:65159/api/';

    var serviceBase = CONSTANT_DATA.oauth_url;

    //http://r2mworks.azurewebsites.net/
    //http://localhost:65159/api/
    var authServiceFactory = {};

    var _authentication = {
      isAuth: false,
      email : "",
      child_name : "",
      grade : "",
      calib : false
    };

    var _fillAuthData = function () {

      var email = localStorageService.get('email');
      var child_name = localStorageService.get('child_name');
      var grade = localStorageService.get('grade');
      var calib = localStorageService.get('calibrate');
      if (email)
      {
        _authentication.isAuth = true;
        _authentication.email =  email;
        _authentication.child_name = child_name;
        _authentication.grade = grade;
      }
      if(calib)
      {
        _authentication.calib = true;
      }

    };

    var _saveRegistration = function (registration) {
      localStorageService.set("email", registration.email);
      localStorageService.set("child_name", registration.child_name);
      localStorageService.set("grade", registration.grade);
      _authentication.isAuth = true;
      _authentication.email =  registration.email;
      _authentication.child_name = registration.child_name;
      _authentication.grade = registration.grade;
    };

    var _logOut = function () {
      localStorageService.remove('email');
      localStorageService.remove('child_name');
      localStorageService.remove('grade');
      localStorageService.remove('calibrate');
      _authentication.isAuth = false;
      _authentication.email =  null;
      _authentication.child_name = null;
      _authentication.grade = null;
      console.log("logout called");
      $state.go("home");

    };

    var _setCalibrate = function (avgTiming) {
      localStorageService.set('calibrate',avgTiming);
      _authentication.calib = true;

    };

    var _getCalibrate = function () {
      var calibrate = localStorageService.get('calibrate');
      return calibrate;
    };

    var _postResult = function (email,gameData) {
      var data = gameData;

      var deferred = $q.defer();

      $http.post(CONSTANT_DATA.business_url + 'SaveAdditionResults', data, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
        $log.debug(response);
        deferred.resolve(response);

      }).error(function (err, status) {
        deferred.reject(err);
      });
      return deferred.promise;
    };




    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.setCalibrate = _setCalibrate;
    authServiceFactory.getCalibrate = _getCalibrate;
    authServiceFactory.postResult = _postResult;
    return authServiceFactory;
  }
})();
