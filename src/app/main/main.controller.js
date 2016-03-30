(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(localStorageService,$log,$state,authService) {
    var vm = this;


    vm.signup = function() {
      localStorageService.set("email", this.email);
      localStorageService.set("child_name", this.child_name);
      localStorageService.set("grade", this.grade);
      var resgistration = {};
      resgistration.email = this.email;
      resgistration.child_name = this.child_name;
      resgistration.grade = this.grade;
      authService.saveRegistration(resgistration);

      console.log(localStorageService.get("email"));
      console.log(localStorageService.get("child_name"));
      console.log(localStorageService.get("grade"));
      $state.go("calibrate");
    }


  }
})();
