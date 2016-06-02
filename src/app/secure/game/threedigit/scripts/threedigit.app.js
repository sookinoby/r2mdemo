(function(){
'use strict';
 angular
.module('threeDigitGameApp', ['threeDigitGameLogic', 'ngAnimate','timer','threeDigitGameData','threeDigitKeyboard'])
.controller('threeDigitGameController', function(threeDigitGameManager, threeDigitKeyboardService,$scope,threeDigitGameDataService,$log,$stateParams,$state,$mdDialog,authService,CONSTANT_DATA) {
  this.assessement = false;
  this.numberOfQuestions = 100;
  this.gameType = 4;
  this.initialGame = true;
  this.grade = 4;
  this.delay = CONSTANT_DATA.delay_three_digit / 1000; //conversion to seconds
  $log.debug("The type is" + this.gameType);
  this.game = threeDigitGameManager;
  this.levelData = null;
  this.dataFileToLoad = "Addition";
  this.nameOfType = "Addition Facts";
  if ($stateParams.type === "1") {
      this.nameOfType = "Addition Facts";
    if(authService.authentication.grade == "0")
    {
      this.nameOfType = "Sum up to 5";
    }
     $log.debug("this gameType" + $stateParams.type );
      this.dataFileToLoad = "Addition";
  }
  else if($stateParams.type === "2") {
    this.nameOfType = "Subtraction Facts";
    $log.debug("this gameType" + $stateParams.type );
    this.dataFileToLoad = "Subtraction";
  }
  else if($stateParams.type === "3") {
    this.nameOfType = "Multiplication Facts";
    if(authService.authentication.grade == "3")
    {
      this.nameOfType = "Product up to 25";
    }
    $log.debug("this gameType" + $stateParams.type );
    this.dataFileToLoad = "Multiplication";
  }
  else if($stateParams.type === "4") {
    this.nameOfType = "Divison Facts";
    if(authService.authentication.grade == "3")
    {
      this.nameOfType = "Dividend up to 25";
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

    this.game.initialiseGame(this.dataFileToLoad,this.assessement,this.numberOfQuestions,this.grade);
    this.timedGame = this.timerToggleButton;
    this.game.gameOver=false;
   // $scope.$broadcast('timer-reset');
    $scope.$broadcast('timer-reset-new',"gameCountDown",CONSTANT_DATA.delay_three_digit/1000);
    // divide by thousand since timer api accepts time in seconds not in milliseconds
    this.titleOfStrategy =  "Addition Fun"

  };

  this.initialiseGameWithAlertBox = function() {
    this.initialGame = false;
    this.showAlert();
  };

  // load the game data.
  this.loadGameData = function() {
    var self = this;
    var scope = $scope;
    self.newGame();
    // promise is resolved for getting the gfame data
    // var promise= threeDigitGameDataService.getGameData("level.json");

    /*  promise.then(function (data)
     {
     $log.debug( data.data );
     self.levelData  = data.data.LevelData;

     for(var i=0;i < self.levelData.length; i++)
     {
     var single_data = {
     'text' : self.levelData[i].name,
     'value' : self.levelData[i].sname
     };
     scope.ddSelectOptions.push(single_data);
     }

     self.newGame();
     });*/
     };

/*
  $scope.ddSelectOptions = [];
   $scope.ddSelectSelected = {
         'text' : "Add Zero",
         'value' : "a0"
   };

*/
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
             if(args.name === "gameCountDown")
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
             }
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
 /*$scope.$watch('ddSelectSelected.text', function(){
    if(self.levelData !== null) {
      self.newGame();
    }
  });*/
  function DialogController($scope, $mdDialog,authService,gameDetailService) {
    this.gameTypeSelected = false;
    this.assessement = false;
    this.shouldShowOptions = true;
    this.showShowLimitedFactsMultiDivison = false;
    this.showShowLimitedFactsAddition = false;
    this.maxValueForMultDiv = 36;
    this.currentOperation = gameDetailService.getCurrentGameDetails().name;
    if(authService.authentication.grade == "0")
    {
      this.showShowLimitedFactsAddition = true;

    }

    if(authService.authentication.grade === "3" && ( this.currentOperation  === "multiplication" || this.currentOperation  === "division" ))
    {
      this.showShowLimitedFactsMultiDivison = true;
      if(this.currentOperation === "division")
        this.maxValueForMultDiv = 30;
      else {
        this.maxValueForMultDiv = 36;
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
      $scope.hide();
    };



    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  };

  this.showAlert = function(ev) {
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
