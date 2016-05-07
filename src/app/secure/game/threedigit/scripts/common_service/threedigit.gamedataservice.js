(function() {
  'use strict';
  var threeDigitGameDataService = function ($http,$q,$log,CONSTANT_DATA) {

      this.getGameData = function(gameDataFile,typeOfGame,noOfQuestions)
      {
          $log.debug(gameDataFile);
           var deferred = $q.defer();
            $http.get(CONSTANT_DATA.business_url + gameDataFile + "/" + typeOfGame + "/" +   noOfQuestions).then(function (data)
            {
              //game/game3/scripts/game3/
                deferred.resolve(data);
            });
          return deferred.promise;
      };
  };
angular.module('threeDigitGameData',[]).service('threeDigitGameDataService',threeDigitGameDataService);

}());
