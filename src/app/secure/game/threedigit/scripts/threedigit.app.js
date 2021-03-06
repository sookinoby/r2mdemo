(function(){
'use strict';
 angular
.module('threeDigitGameApp', ['threeDigitGameLogic', 'ngAnimate','timer','threeDigitGameData','threeDigitKeyboard'])
.controller('threeDigitGameController', function(threeDigitGameManager, threeDigitKeyboardService,$scope,threeDigitGameDataService,$log,$stateParams,$state,$mdDialog,authService,CONSTANT_DATA,$translate) {
  this.assessement = false;
  this.numberOfQuestions = 100;
  this.gameType = 4;
  this.initialGame = true;
  this.grade = 4;
  this.delay = CONSTANT_DATA.delay_three_digit / 1000; //conversion to seconds
  $log.debug("The type is" + this.gameType);
  this.game = threeDigitGameManager;
  this.game.deleteAllBoards();
  this.levelData = null;
  this.dataFileToLoad = "Addition";
  this.nameOfType = $translate.instant("game.three.title_addition");
  if ($stateParams.type === "1") {
      this.nameOfType = $translate.instant("game.three.title_addition");
    if(authService.authentication.grade == "0")
    {
      this.nameOfType = $translate.instant("game.three.title_addition_K");
    }
     $log.debug("this gameType" + $stateParams.type );
      this.dataFileToLoad = "Addition";
  }
  else if($stateParams.type === "2") {
    this.nameOfType = $translate.instant("game.three.title_subtraction");
    $log.debug("this gameType" + $stateParams.type );
    this.dataFileToLoad = "Subtraction";
  }
  else if($stateParams.type === "3") {
    this.nameOfType =  $translate.instant("game.three.title_multiplication");
    if(authService.authentication.grade == "3")
    {
      this.nameOfType = $translate.instant("game.three.title_multiplication_3");
    }
    $log.debug("this gameType" + $stateParams.type );
    this.dataFileToLoad = "Multiplication";
  }
  else if($stateParams.type === "4") {
    this.nameOfType = $translate.instant("game.three.title_divison");
    if(authService.authentication.grade == "3")
    {
      this.nameOfType = $translate.instant("game.three.title_divison_3");
    }
    $log.debug("this gameType" + $stateParams.type );
    this.dataFileToLoad = "Division";
  }
  else {
    this.gameType = 1;
    this.dataFileToLoad = "Addition";
    $log.debug("this gameType default");
  }

  this.timerToggleButton = false;
  threeDigitKeyboardService.destroy();
  threeDigitKeyboardService.init();

  // the new Game
  this.newGame = function() {
//  console.log(this.game);
    this.grade = authService.authentication.grade;
    console.log("the grade of student is" + this.grade);
    this.timedGame = this.timerToggleButton;
    this.game.gameOver=false;
   // $scope.$broadcast('timer-reset');
//    $scope.$broadcast('timer-reset-new',"gameCountDown",CONSTANT_DATA.delay_three_digit/1000);
    this.game.reinit();
    this.game.initialiseGame(this.dataFileToLoad,this.assessement,this.numberOfQuestions,this.grade);
   // console.log($scope.countdown);
    // divide by thousand since timer api accepts time in seconds not in milliseconds

  };

  this.initialiseGameWithAlertBox = function() {
    this.showOptions();
  };


   this.timedGame = false;
   $scope.timerRunning = false;

   this.startTimer = function (name){
   $scope.$broadcast('timer-start',name);
   $scope.timerRunning = true;
   };

    $scope.stopTimer = function (){

    $scope.$broadcast('timer-stop');
    $scope.timerRunning = false;
    };



    this.countDown = function() {
         var self = this;
         $scope.$on('timer-stopped', function (event, args){

           $scope.$apply(function () {
             self.game.resetTimer();
           /*  if(args.name === "gameCountDown")
             {
                 self.startTimer("gameTimer");
                // $log.debug('Game Count Down ', args);
             }
            else if(args.name === "gameTimer")
             {
                  if(self.timedGame)
                  {
                      self.game.gameOver=true;
                  }
             } */
         });
       });
     };

     this.showResult = function() {
       $state.go('result');
     }



     this.initialiseCallBack = function() {
    var self = this;
      threeDigitKeyboardService.on(function(key) {
      self.game.move(key).then(function() {

      });
    });
  };




  this.initialiseCallBack();

   // this.loadGameData();
  this.countDown();

    var self = this;
    function DialogController($scope, $mdDialog,authService,gameDetailService) {
    this.gameTypeSelected = false;
    this.assessement = false;
    this.shouldShowOptions = true;
    this.showShowLimitedFactsMultiDivison = false;
    this.showShowLimitedFactsAddition = false;
    this.option1 = 25;
    this.option2 = 50;
    this.option3 = 100;
    this.maxValueForMultDiv = 100;
    this.currentOperation = gameDetailService.getCurrentGameDetails().name;
    if(authService.authentication.grade === "0")
    {
      this.showShowLimitedFactsAddition = true;
      this.option1 = 10;
      this.option2 = 15;
      this.option3 = 21;

    }
    if(this.currentOperation === "division")
    {
      this.option3 = 90;
    }

    if(authService.authentication.grade === "3" && ( this.currentOperation  === "multiplication" || this.currentOperation  === "division" ))
    {
      this.showShowLimitedFactsMultiDivison = true;
      if(this.currentOperation === "division")
        this.this.option3 = 30;
      else {
        this.option3 = 36;
      }

    }
    this.selected_practice = function(){
     // authService.setGameType("practice");
      $scope.threeCtrl.assessement = false;
      $scope.threeCtrl.numberOfQuestions = 15;
      console.log($scope);
      this.gameTypeSelected = true;
      this.assessement = false;
      $scope.hide();
      $scope.threeCtrl.newGame();
      $scope.threeCtrl.initialGame = false;

      //  console.log(authService.getGameType())
    };

    this.selected_assessment= function(){
     // authService.setGameType("assessment");
      $scope.threeCtrl.assessement = true;
      this.assessement = true;
      this.gameTypeSelected = true;
  //    console.log(authService.getGameType())
    };

    this.numberOfQuestionSelected = function()
    {
      console.log("the selection has been done");
      $scope.threeCtrl.numberOfQuestions = this.data.numberOfQuestions;
      $scope.threeCtrl.newGame();
      $scope.threeCtrl.initialGame = false;
      $scope.hide();
    };



    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  };

  this.showOptions = function(ev) {
    var self = this;
    $mdDialog.show({
      templateUrl: 'app/secure/game/threedigit/scripts/dialog.tmpl.html',
      targetEvent: ev,
      clickOutsideToClose: true,
      scope: $scope,        // use parent scope in template
      preserveScope: true,
      controller: DialogController,
      controllerAs: 'dt',
    });

  };

  this.initialiseGameWithAlertBox();



});
}
)();
