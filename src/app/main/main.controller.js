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

      var resgistration = {};
      resgistration.email = this.email;
      authService.saveRegistration(resgistration);
      $state.go("calibrate");
    }


  }
})();
