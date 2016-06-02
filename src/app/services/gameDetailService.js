(function() {

  'use strict';
  angular.module('GameDetails',[]).factory('gameDetailService', gameDetailService );

  function gameDetailService($http, $q, localStorageService,$state,$log,CONSTANT_DATA) {
    // var serviceBase = 'http://localhost:65159/api/';
    var gameDetailService = {};
    this.currentGame = null;
    var gameType = 1;
    this.gameResult = false;
    var addition = {
      name : "addition",
      isCalib:false,
      calib_time: null,
      count:0
    };

    var multiplication = {
      name : "multiplication",
      isCalib:false,
      calib_time: null,
      count:0
    };

    var division = {
      name : "division",
      isCalib:false,
      calib_time: null,
      count:0
    };

    var subtraction = {
      name : "subtraction",
      isCalib:false,
      calib_time: null,
      count:0
    };

    var _setCurrentGame = function(operation) {
        localStorageService.set("operation",operation);
        if(operation === "addition")
        {
         //// $log.debug(operation);
          this.currentGame = addition;

          $log.debug(this.currentGame);
        }
        else if (operation === "subtraction")
        {
          $log.debug(operation);
          this.currentGame = subtraction;

        }
        else if(operation === "multiplication")
        {
          $log.debug(operation);
          this.currentGame = multiplication;
          $log.debug("multi is assigned");
          $log.debug(this.currentGame);
        }
        else if(operation === "division")
        {
          $log.debug(operation);
          this.currentGame = division;
        }
      else {
          //default set it to addition;
          $log.debug(this.currentGame);
          this.currentGame = addition;
        }
      localStorageService.set(this.currentGame.name,this.currentGame);
    };

    var _fillGameDetails = function () {
      var operation = localStorageService.get("operation");
      if(operation != null) {
        // load all the data
        var addition_temp = localStorageService.get("addition");
        var multiplication_temp = localStorageService.get("multiplication");
        var division_temp = localStorageService.get("division");
        var subtraction_temp = localStorageService.get("subtraction");
        if(addition_temp != null)
        {
          addition = addition_temp;
        }
        if(subtraction_temp != null)
        {
          subtraction = subtraction_temp;
        }
        if(multiplication_temp != null)
        {
          multiplication = multiplication_temp;
        }
        if(division_temp != null )
        {
          division = division_temp;
        }

        if (operation === "addition") {
          $log.debug(operation);
          this.currentGame = addition;

        }
         if (operation === "subtraction") {
          $log.debug(operation);
          this.currentGame = subtraction;

        }
         if (operation === "multiplication") {
          $log.debug(operation);

          this.currentGame = multiplication;
          //$log.debug("something is happening multi is assigned");
         // $log.debug(this.currentGame);
        }
        if (operation === "division") {
          $log.debug(operation);
          this.currentGame = division;
        }
      }

    };

    var _setCalibrate = function (avgTiming) {
      console.log(this.currentGame);
      this.currentGame.calib_time = avgTiming;
      this.currentGame.isCalib = true;
      localStorageService.set(this.currentGame.name,this.currentGame);


    };

    var _getCalibrate = function () {
       return this.currentGame.calib_time;
    };



    var _setGameType = function (gameType) {
      gameType = gameType;
      console.log("game Type is logged simply");

    };

    var _getGameType = function () {
      return gameType;
    };


    var _setResult = function (gameData) {
      this.gameResult = true;
      this.currentGame.count = this.currentGame.count + 1;
      localStorageService.set(this.currentGame.name,this.currentGame);
      localStorageService.set('gameData',gameData);
    };

    var _getResult = function () {
      return localStorageService.get('gameData');
    };

    var _postResult = function (username,gameData) {
      var data = gameData;

      var deferred = $q.defer();

      $http.post(CONSTANT_DATA.business_url + 'api/SaveStudentResults', data, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
        $log.debug(response);
        deferred.resolve(response);

      }).error(function (err, status) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    var _getCurrentGameDetails = function () {
       return this.currentGame;
    };

    var _currentGameIncremenet = function () {
      this.currentGame.count = this.currentGame.count + 1;
      localStorageService.set(this.currentGame.name,this.currentGame);
    };

    var _deleteGameDetails = function () {
      localStorageService.remove('addition');
      localStorageService.remove('subtraction');
      localStorageService.remove('multiplication');
      localStorageService.remove('division');
      localStorageService.remove('operation');
      localStorageService.remove('gameData');
      this.currentGame = null;
       gameType = 1;
      this.gameResult = false;
      addition = {
        name : "addition",
        isCalib:false,
        calib_time: null,
        count:0
      };

      multiplication = {
        name : "multiplication",
        isCalib:false,
        calib_time: null,
        count:0
      };

      division = {
        name : "division",
        isCalib:false,
        calib_time: null,
        count:0
      };

      subtraction = {
        name : "subtraction",
        isCalib:false,
        calib_time: null,
        count:0
      };


    };
    var _getAdditionDetails = function() {
      return addition.count;
    };

    var _getSubtractionDetails = function() {
      console.log("the subtraction count was" + subtraction.count);
      return subtraction.count;
    };

    var _getMultiplicationDetails = function() {
      return multiplication.count;
    };

    var _getDivisionDetails = function() {
      return division.count;
    };
    var _getMaxCount = function() {
      return CONSTANT_DATA.max_count_games;
    }


    gameDetailService.getAdditionDetails = _getAdditionDetails;
    gameDetailService.getSubtractionDetails = _getSubtractionDetails;
    gameDetailService.getMultiplicationDetails =  _getMultiplicationDetails;
    gameDetailService.getDivisionDetails = _getDivisionDetails;

    gameDetailService.fillGameDetails = _fillGameDetails;
    gameDetailService.getCurrentGameDetails = _getCurrentGameDetails;

    gameDetailService.setCalibrate = _setCalibrate;
    gameDetailService.getCalibrate = _getCalibrate;
    gameDetailService.postResult = _postResult;

    gameDetailService.setResult = _setResult;
    gameDetailService.getResult = _getResult;

    gameDetailService.setGameType = _setGameType;
    gameDetailService.getGameType = _getGameType;
    gameDetailService.setCurrentGame = _setCurrentGame;
    gameDetailService.currentGameIncremenet = _currentGameIncremenet;
    gameDetailService.deleteGameDetails = _deleteGameDetails;
    gameDetailService.getMaxCount = _getMaxCount;
    return gameDetailService;
  }
})();
