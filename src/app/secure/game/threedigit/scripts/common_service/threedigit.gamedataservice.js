(function() {
  'use strict';
  var threeDigitGameDataService = function ($http,$q,$log,CONSTANT_DATA) {

      this.getGameData = function(gameDataFile,typeOfGame,noOfQuestions,grade) {
        var promise;
          if (CONSTANT_DATA.mock_calls === false) {
            if(grade === null)
            {
              console.log("the grade was null");
              grade = 4;
            }
            promise = $http.get(CONSTANT_DATA.business_url + gameDataFile + "/" + typeOfGame + "/" + noOfQuestions + "/grade/" + grade).then(function (data) {
              //game/game3/scripts/game3/
              return data;
            });
          }
          else {
            promise = $http.get(CONSTANT_DATA.local_url + 'app/secure/game/threedigit/scripts/game_data/' + gameDataFile + "/" + typeOfGame + "/" + noOfQuestions + ".json").then(function (data) {
              return data;

            });
          }
        return promise;

      };
  };
angular.module('threeDigitGameData',[]).service('threeDigitGameDataService',threeDigitGameDataService);

}());
