(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar(authService,gameDetailService,$mdDialog,$state,LocaleService) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        studentName: '@'
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      console.log("TEST" + this.studentName);
      var vm = this;
      vm.childNameSet = false;
     // vm.studentName = null;
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
        console.log(authService.authentication);
      }

      this.checkChildDetails = function()
      {
        if(authService.authentication.isAuth)
        {
          if(authService.authentication.child_name != null && authService.authentication.child_name != "")
          vm.studentName = authService.authentication.child_name + ",";
          vm.childNameSet = true;
        }

      }
      this.checkChildDetails();

      this.changePage = function(){
        vm.loggedIn = true;
        $state.go('main');
      }

      this.loginPage = function(){
        $state.go('login');
      }


      // "vm.creation" is avaible by directive option "bindToController: true"
      this.logOut = function () {
        vm.loggedIn = false;
        gameDetailService.deleteGameDetails();
        authService.logOut();
      }

      this.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();

      this.localesDisplayNames = LocaleService.getLocalesDisplayNames();

      this.visible = this.localesDisplayNames &&
        this.localesDisplayNames.length > 1;

      this.changeLanguage = function (locale) {
        LocaleService.setLocaleByDisplayName(locale);
        console.log("locale has Changed");
      };


    }
  }

})();
