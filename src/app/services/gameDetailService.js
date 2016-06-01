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
      username : "",
      child_name : "",
      grade : "",
      calib : false,
      result: false,
      gameType:"practice"
    };

    var _fillAuthData = function () {

      var username = localStorageService.get('username');
      var child_name = localStorageService.get('child_name');
      var grade = localStorageService.get('grade');
      var calib = localStorageService.get('calibrate');
      var result_data = localStorageService.get('gameData');

      if (username)
      {
        _authentication.isAuth = true;
        _authentication.username =  username;
        _authentication.child_name = child_name;
        _authentication.grade = grade;
      }
      if(calib)
      {
        _authentication.calib = true;
      }
      if(result_data)
      {

        _authentication.result = true;
      }

    };

    var _saveRegistration = function (registration) {
      localStorageService.set("username", registration.username);
      //  localStorageService.set("child_name", registration.child_name);
      // localStorageService.set("grade", registration.grade);
      _authentication.isAuth = true;
      _authentication.username =  registration.username;
      // _authentication.child_name = registration.child_name;
      // _authentication.grade = registration.grade;
    };

    var _saveChildDetails = function (child_name,child_grade) {

      localStorageService.set("child_name", child_name);
      localStorageService.set("grade", child_grade);
      _authentication.child_name = child_name;
      _authentication.grade = child_grade;
    };

    var _logOut = function () {
      localStorageService.remove('username');
      localStorageService.remove('child_name');
      localStorageService.remove('grade');
      localStorageService.remove('calibrate');
      localStorageService.remove('gameData');
      _authentication.isAuth = false;
      _authentication.username =  null;
      _authentication.child_name = null;
      _authentication.grade = null
      _authentication.result = false;
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

    var _setCalibrate = function (avgTiming) {
      localStorageService.set('calibrate',avgTiming);
      _authentication.calib = true;

    };

    var _setGameType = function (gameType) {
      _authentication.gameType = gameType;
    };

    var _getGameType = function () {
      return _authentication.gameType;
    };

    var _postResult = function (username,gameData) {
      var data = gameData;

      var deferred = $q.defer();

      $http.post(CONSTANT_DATA.business_url + 'SaveStudentResults', data, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
        $log.debug(response);
        deferred.resolve(response);

      }).error(function (err, status) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    var _setResult = function (gameData) {
      _authentication.result = true;
      localStorageService.set('gameData',gameData);
    };


    var _getResult = function () {
      return localStorageService.get('gameData');
    };

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory._saveChildDetails = _saveChildDetails;
    authServiceFactory.setCalibrate = _setCalibrate;
    authServiceFactory.getCalibrate = _getCalibrate;
    authServiceFactory.postResult = _postResult;
    authServiceFactory.setResult = _setResult;
    authServiceFactory.getResult = _getResult;
    authServiceFactory.setGameType = _setGameType;
    authServiceFactory.getGameType = _getGameType;

    return authServiceFactory;
  }
})();
