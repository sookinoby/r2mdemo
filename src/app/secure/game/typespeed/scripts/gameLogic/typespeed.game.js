(function(){
  'use strict';
  angular.module('typeSpeedLogic', ['threeDigitGrid'])
    .service('typeSpeedManager', function($q, $timeout,typeSpeedDataService,$log,authService,gameDetailService,CONSTANT_DATA) {

      this.getHighScore = function() {
        return  0;
      };
      this.delay = CONSTANT_DATA.delay_type_speed;
      this.delayedTriggerHolder = null;
    //  this.grid = threeDigitGridService.grid;
    //  this.tiles = threeDigitGridService.tiles;
      this.gameData = null;
      this.average = 0;
     // this.storeAnswer = threeDigitGridService.storeAnswer;
      this.watchListContent = null;
      //this.winningValue = 2048;
      this.stats = true;
      // show/hide UI options
      this.scoreButton = false;
      this.watchList = false;
      this.instantaneousFeedBack = false;
      this.pacer = false;
      this.isTimed = false;
      this.errorList = false;
      this.current_qn  = 0;
      this.userInput = {};
      this.userInput.a = null;
      this.showNextButton = {};
      this.showSubmitButton = {};
      this.showSubmitButton.truthValue = false;
      this.showNextButton.truthValue = false;
      this.questionToDisplay = {};
      this.enterCount = 0;
      this.totalfacts = 0;
      this.rightAnswer = false;
      this.netural  = true;
      this.startTime = null;
      this.endTime = null;

      this.indexOf = function(needle) {
        var indexOf;
        if(typeof Array.prototype.indexOf === 'function') {
          indexOf = Array.prototype.indexOf;
        } else {
          indexOf = function(needle) {
            var index = -1;

            for(var i = 0; i < this.length; i++) {
              if(this[i] === needle) {
                index = i;
                break;
              }
            }

            return index;
          };
        }

        return indexOf.call(this, needle);
      };

      this.resetTimer = function(){
        this.countdownfinished = true;
      };

      this.changeStats = function()  {
        this.stats  = !this.stats;
      };

      this.passValueToGridService = function()
      {
      //  threeDigitGridService.toShowSubmitButton(this.showSubmitButton);
      //  threeDigitGridService.toShowNextButton(this.showNextButton);
      //  threeDigitGridService.errorListActivate(this.errorList);
      };

      this.passValueToGridService();

      this.evaluateAnswer2 = function()
      {
       // var score = threeDigitGridService.evaluateAnswer2();
        console.log("user input" + this.userInput.a);
        var d = new Date();
        this.endTime =  d.getTime();
        var timeTaken = this.endTime - this.startTime;
        if(this.current_qn === 0 || this.current_qn === 1) {
          timeTaken = 0;
        //  console.log("the taken was zero");
        }
        this.gameData.questionList[this.current_qn].Time = timeTaken;
        this.showNextQuestions2();
      };


      this.showNextQuestions2 = function()
      {
        $log.debug("show next question");
        this.totalfacts =  this.totalfacts + 1;
        console.log("user input " + this.userInput.a );
        this.userInput.a = null;

       // this.gameOver = threeDigitGridService.showNextQuestions2();
       // this.watchListContent = threeDigitGridService.getWatchList();
        // this.rightAnswer = false;
        // this.netural  = true;
        this.current_qn = this.current_qn + 1;
        this.questionToLoad();
        this.showNextButton.truthValue = false;
        this.showSubmitButton.truthValue = false;
      };



      this.reinit = function() {
        this.gameOver = false;
        this.win = false;
        this.currentScore = 0;
        this.totalfacts = 0;
      //  this.highScore = this.getHighScore();
        // removed this since we dont use timer funtionality
        this.countdownfinished = false;
        this.showSubmitButton.truthValue = false;
        this.enterCount = 0;
        this.rightAnswer = false;
        this.netural  = true;
        this.current_qn = 0;

      };
      //this.reinit();

      this.initialiseGame = function(nameOfStrategy) {
        var self = this;
        this.reinit();
        var promise = typeSpeedDataService.getGameData(nameOfStrategy +".json");
        promise.then(function (data) {
          self.resetTimer();
          self.gameData = data.data.gameData;
          self.newGame(self.gameData);
          self.setScoreButton(self.gameData.scoreButton);
          self.setInstantaneousFeedBack(self.gameData.InstantaneousFeedBack);
        //  threeDigitGridService.setInstantaneousFeedBack(self.gameData.InstantaneousFeedBack);
          self.setPacer(self.gameData.Pacer);
          self.setWatchList(self.gameData.WatchList);
          self.setIsTimed(self.gameData.IsTimed);
          self.newGame();

        });
      };

      this.newGame = function(gameData) {
        var self = this;
        if(self.delayedTriggerHolder)
        {
          $timeout.cancel(self.delayedTriggerHolder);
        }

        self.delayedTriggerHolder = $timeout(function tobuilstartinPosition() {
          $log.debug('update with timeout fired');
        }, self.delay);
        this.totalNumberOfQuestion = this.gameData.questionList.length;
       // this.watchListContent =  threeDigitGridService.getWatchList();

        this.questionToLoad();
      };

      this.questionToLoad = function ()  {
        if( this.current_qn === this.totalNumberOfQuestion )
        {
          this.gameOver = true;

          var totalTime = 0;
          for(var i=0;i < this.gameData.questionList.length; i++)
          {
            totalTime = totalTime + this.gameData.questionList[i].Time;

          }
          console.log("TotalTime" + totalTime);
          // the first two questions timing is ignored for calculation purpose..
          // so the question lenght is reduced by 2 for compenstation
          var avg = totalTime / (this.gameData.questionList.length - 2);
          console.log("average" + avg);
            gameDetailService.setCalibrate(avg);
         // console.log(this.gameData.questionList);
          return ;
        }
        var gameData = this.gameData;

        var q = gameData.questionList[this.current_qn].Q[0];
        this.questionToDisplay.q = q;

        var d = new Date();
        this.startTime =  d.getTime();


      };

      this.setScoreButton = function(value) {
        this.scoreButton = value;
      };

      this.setPacer = function(value) {
        this.pacer = value;
      };

      this.setWatchList = function(value) {
        $log.debug("wacthList" + this.watchList);
        this.watchList = value;
      };

      this.setInstantaneousFeedBack = function(value) {
        this.instantaneousFeedBack  = value;
      };

      this.setIsTimed = function(value) {
        this.isTimed  = value;
      };

      /*
       * The game loop
       *
       * Inside here, we'll run every 'interesting'
       * event (interesting events are listed in the Keyboard service)
       * For every event, we'll:
       *  1. look up the appropriate vector
       *  2. find the furthest possible locations for each tile and
       *     the next tile over
       *  3. find any spots that can be 'merged'
       *    a. if we find a spot that can be merged:
       *      i. remove both tiles
       *      ii. add a new tile with the double value
       *    b. if we don't find a merge:
       *      i. move the original tile
       */

      this.move = function(key) {

        var self = this;

        var f = function() {

          /*     if(!self.countdownfinished)
           return;
           if(self.gameOver)
           return true;
           */

          if(self.win) { return false; }
          if(key === "up")
          {
            $log.debug("up arrow pressed");
          }
          if(key === "enter")
          {
            self.enterCount++;
            if(self.userInput.a != null && self.userInput.a != "" && self.userInput.a != undefined)
            {

              if(self.enterCount === 1)
              {
                console.log(self.userInput.a);
                self.evaluateAnswer2();
                self.enterCount = 0;
              }
            } else {
              self.enterCount = 0;
            }

          }

        };
        return $q.when(f());
      };

      this.shouldShowSubmit = function() {
        if (this.userInput.a != null && this.userInput.a != "" && this.userInput.a != undefined) {
          this.showSubmitButton.truthValue = true;
        }
      }

      this.updateScore = function(newScore) {

        this.currentScore = this.currentScore + newScore;
        if(this.currentScore > this.getHighScore()) {
          this.highScore = this.currentScore + newScore;
        }
      };

    });
})();
