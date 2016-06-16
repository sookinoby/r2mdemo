(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($rootScope,$scope,$log,$state,$translate,authService,SweetAlert) {
    var vm = this;
    $scope.locale = $translate.use();
    var loginSignInTextId = "login.signin.text";
    var loginSignInProcessId =  "login.signin_process.text";
    vm.button_message_sign_in = $translate.instant(loginSignInTextId);
    vm.button_message_sign_process =  $translate.instant(loginSignInProcessId);
    vm.button_message =  vm.button_message_sign_in;
    vm.loggining = false;

    vm.loginData = {};

    vm.login = function() {
        vm.loggining = true;
        vm.button_message =  vm.button_message_sign_process;
        vm.loginData.userName = vm.username;
        vm.loginData.password = vm.password;
        console.log("Login clicked");

        authService.login(vm.loginData)
          .then(function(response) {
            console.log("logging in the users")
            vm.loginData.userName = "";
            vm.loginData.password = "";
            vm.loggining = false;
            vm.button_message = vm.button_message_sign_in;
            $log.debug(response);
            $state.go('main');
          })
          .catch(function(response) {
            vm.loggining = false;
            vm.button_message =  vm.button_message_sign_in;
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

    /*
    $translate(loginSignInTextId, loginSignInProcessId)
      .then(function (translatedm1, translatedm2) {
        vm.button_message_sign_in = translatedm1;
        console.log(translatedm1);
        vm.button_message_sign_process = translatedm2;
      });*/


    $rootScope.$on('$translateChangeSuccess', function (event, data) {
      $scope.locale = data.language;
      vm.button_message_sign_in = $translate.instant(loginSignInTextId);
      vm.button_message_sign_process = $translate.instant(loginSignInProcessId);
    });




  }
})();
