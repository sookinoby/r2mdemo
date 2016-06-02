(function(){
    'use strict';
    angular
      .module('typeSpeedApp', ['typeSpeedLogic', 'ngAnimate','timer','typeSpeedData','typeSpeedKeyboard'])
      .controller('typeSpeedController', function(typeSpeedManager, typeSpeedKeyboardService,$scope,typeSpeedDataService,$log,authService,$mdDialog,$state,gameDetailService,CONSTANT_DATA) {
        this.initialGame = true;
        this.gameType = 4;
        $log.debug("The type is" + this.gameType);
        this.game = typeSpeedManager;
        this.levelData = null;
        this.delay = CONSTANT_DATA.delay_type_speed / 1000; //conversion to seconds
        this.child_name = authService.authentication.child_name;
        this.game.gameOver=false;
        this.timerToggleButton = false;
        typeSpeedKeyboardService.destroy();
        typeSpeedKeyboardService.init();

        // the new Game
        this.newGame = function() {
          /*
          if(this.checkIfChildName())
          {
          return;
          }*/
          this.initialGame = false;
          this.game.initialiseGame("m1");
          this.timedGame = this.timerToggleButton;
          this.game.gameOver=false;
          // removed the broadcast listerners
        //  $scope.$broadcast('timer-reset');
        //  $scope.$broadcast('timer-reset-new',"gameCountDown",this.delay);

          this.titleOfStrategy =  "Keyboard Test"

        };

        // load the game data.
        this.loadGameData = function() {
          var self = this;
          var scope = $scope;
         // self.newGame();
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

        this.initialiseCallBack = function() {
          var self = this;
          typeSpeedKeyboardService.on(function(key) {
            self.game.move(key).then(function() {

            });
          });
        };
        this.initialiseCallBack();

        this.loadGameData();
        this.countDown();
        // to prevent the count down from happening, I set the countFinished to false
        var self = this;
        /*$scope.$watch('ddSelectSelected.text', function(){
         if(self.levelData !== null) {
         self.newGame();
         }
         });*/

        // Code for entering the students name and grade
        this.checkIfChildName = function()
        {
        var child_name = authService.authentication.child_name;
          if(child_name == null)
          {
            this.showDialogBox();
            return true;
          }
          if(child_name != null && child_name == "")
          {
            this.showDialogBox();
            return true;
          }
        };

        function DialogController($scope, $mdDialog,authService) {
          this.set_child_details = function(){
           // this refers to the ng-model of dialog controller
            authService.saveChildDetails(this.child_name,this.child_grade);
            console.log(authService.authentication);
            $scope.typeCtrl.child_name = this.child_name;
            $scope.hide();
          };

          this.gradeObject = function(display,grade)
          {
            return {"display": "grade" + display, "grade":grade}
          };
          this.availabeGrade = [];
          this.createGrade  = function()
          {
            console.log("grades are loaded")
            var grade = this.gradeObject("K","K");
            this.availabeGrade.push(grade);
            for(var i=1; i<= 12; i++)  {
              grade = this.gradeObject(i,i);
              this.availabeGrade.push(grade);
            }

          };
          this.createGrade();
          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

        };

        this.showDialogBox = function(ev) {
          var self = this;
          $mdDialog.show({
            templateUrl: 'app/secure/game/typespeed/scripts/common_service/dialog.tmpl.html',
            targetEvent: ev,
            clickOutsideToClose: false,
            scope: $scope,        // use parent scope in template
            preserveScope: true,
            controller: DialogController,
            controllerAs: 'dt',
          });

        };
        this.changeState = function() {
          if (gameDetailService.getCurrentGameDetails().name === "addition") {
            $state.go('threedigit', {type: 1});
          }
          else if (gameDetailService.getCurrentGameDetails().name === "subtraction") {
            $state.go('threedigit', {type: 2});
          }
          else if (gameDetailService.getCurrentGameDetails().name === "multiplication") {
            $state.go('threedigit', {type: 3});
          }
          else if (gameDetailService.getCurrentGameDetails().name === "division") {
            $state.go('threedigit', {type: 4});
          }
        }
          this.newGame();
      });
  }
)();

