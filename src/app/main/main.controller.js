(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(localStorageService,$log,$state,authService,gameDetailService,$mdDialog,$scope) {
    var vm = this;
    this.child_name = "name";
    this.maxCount = gameDetailService.getMaxCount();
    if(authService.authentication.grade)
    {
    this.child_grade = authService.authentication.grade;
    }
    else {
      this.child_grade = 4;
    }

    this.additionCount = gameDetailService.getAdditionDetails();
    this.subtractionCount = gameDetailService.getSubtractionDetails();
    this.multiplicationCount = gameDetailService.getMultiplicationDetails();
    this.divisionCount = gameDetailService.getDivisionDetails();
    console.log(this.additionCount );
    console.log(this.subtractionCount);
    vm.signup = function() {
      localStorageService.set("email", this.email);

      var resgistration = {};
      resgistration.email = this.email;
      authService.saveRegistration(resgistration);
      $state.go("calibrate");
    }

    vm.selected = function(operation){
      if(this.checkIfChildName() === false) {
        gameDetailService.setCurrentGame(operation);
        $state.go("calibrate");
      }
    }

    // Code for entering the students name and grade
    this.checkIfChildName = function()
    {
      var child_name = authService.authentication.child_name;
      console.log(child_name + "teassfsa");
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
      return false;
    };

    function DialogController($scope, $mdDialog,authService) {
      this.set_child_details = function(){
        // this refers to the ng-model of dialog controller
        authService.saveChildDetails(this.child_name,this.child_grade);
        console.log($scope);
        $scope.main.child_grade = this.child_grade;
        console.log("child_grade" + this.child_grade);
        console.log(authService.authentication);
        $scope.main.child_name = this.child_name;
        $scope.hide();
      };

      this.gradeObject = function(display,grade)
      {
        return {"display": "grade " + display, "grade":grade}
      };
      this.availabeGrade = [];
      this.createGrade  = function()
      {
        console.log("grades are loaded")
        var grade = this.gradeObject("Kindergarten","0");
        grade.display = "Kindergarten";
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
        templateUrl: 'app/main/dialog.tmpl.html',
        targetEvent: ev,
        clickOutsideToClose: false,
        scope: $scope,        // use parent scope in template
        preserveScope: true,
        controller: DialogController,
        controllerAs: 'dt'
      });

    };
    this.checkIfChildName();
    if(authService.authentication.isAuth === false)
    {
      $state.go('login');
    }

  }
})();
