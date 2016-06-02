(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope,$state,authService,gameDetailService, SweetAlert) {

    authService.fillAuthData();
    gameDetailService.fillGameDetails();
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $log.debug("starting route changes" );
      if (toState.authenticate && !authService.authentication.isAuth) {
        $log.debug(toState);
        $log.debug('event prevent default trigged');
        $state.go("login");
     //   SweetAlert.swal("","Please signup before assessment","error");

        event.preventDefault();

      }
      else if(toState.calib && authService.authentication.isAuth && gameDetailService.currentGame && !gameDetailService.currentGame.isCalib)
      {
        $state.go("calibrate");
        SweetAlert.swal("","Please do the calibration atleast once before assessment","error");
        event.preventDefault();
      }
      else if(toState.child_required && authService.authentication.isAuth && authService.authentication.child_name_set === false)
      {
        $state.go("main");
        SweetAlert.swal("","Please enter the child details","error");
        event.preventDefault();
      }

    });
    $log.debug('runBlock end');
  }

})();
