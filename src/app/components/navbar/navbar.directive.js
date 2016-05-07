(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar(authService,$mdDialog) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      var vm = this;
      vm.loggedIn = false
      vm.studentName = null;
      authService.fillAuthData();

      if(authService.authentication.isAuth && authService.authentication.result)
      {
      vm.shouldShowResult = authService.authentication.result;
      }
      else {
        vm.shouldShowResult = false;
      }

     // console.log(vm.shouldShowResult);
       if(authService.authentication.isAuth)
      {
        vm.loggedIn = true;
        vm.studentName = authService.authentication.child_name;
      }
      // "vm.creation" is avaible by directive option "bindToController: true"
      this.logOut = function () {
        authService.logOut();
      }


    }
  }

})();
