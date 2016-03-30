(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$rootScope,$state,authService,SweetAlert) {

    authService.fillAuthData();

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      $log.debug("starting route changes" );
      $log.debug(toState.data);
      if (toState.authenticate && !authService.authentication.isAuth) {
        $log.debug(toState);
        $log.debug('event prevent default trigged');
        $state.go("home");
        SweetAlert.swal("","Please signup before assessment","error");

        event.preventDefault();

      }
      else if(toState.calib && authService.authentication.isAuth && !authService.authentication.calib)
      {
        $state.go("calibrate");
        SweetAlert.swal("","Please do the calibration atleast once before assessment","error");
        event.preventDefault();
      }
      $log.debug(toState.calib )

    });
    $log.debug('runBlock end');
  }

})();
