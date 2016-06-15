(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(localStorageService,$log,$state,authService,SweetAlert) {
    var vm = this;
    vm.button_message = "Sign In";
    vm.loggining = false;
    vm.loginData = {};

    vm.login = function() {
        vm.loggining = true;
        vm.button_message = "Signing In";
        vm.loginData.userName = vm.username;
        vm.loginData.password = vm.password;
        console.log("Login clicked");

        authService.login(vm.loginData)
          .then(function(response) {
            console.log("logging in the users")
            vm.loginData.userName = "";
            vm.loginData.password = "";
            vm.loggining = false;
            vm.button_message = "Sign In";
            $log.debug(response);
            $state.go('main');
          })
          .catch(function(response) {
            vm.loggining = false;
            vm.button_message = "Sign In";
            var error_description = "Something went wrong, Please Try again later";
            //TODO better error description;
            if(response !=null && response.error_description != null )
            {
              error_description = response.error_description;
            }
           else
            {
              error_description = "Something went wrong, Please Try again later";
            }
            SweetAlert.swal("",error_description,"error");
            $log.debug(response);
          });
      };




  }
})();
