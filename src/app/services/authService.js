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
      grade : ""
    };

    var _fillAuthData = function () {

      var email = localStorageService.get('email');
      var child_name = localStorageService.get('child_name');
      var grade = localStorageService.get('grade');

      if (email)
      {
        _authentication.isAuth = true;
        _authentication.email =  email;
        _authentication.child_name = child_name;
        _authentication.grade = grade;
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
      _authentication.isAuth = false;
      _authentication.email =  null;
      _authentication.child_name = null;
      _authentication.grade = null;
      console.log("logout called");
      $state.go("home");

    };




    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    return authServiceFactory;
  }
})();
