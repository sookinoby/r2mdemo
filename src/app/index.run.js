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
        if(toState.calib && authService.calib)
        {
          $state.go("calibrate");
        }
        $state.go("home");
        SweetAlert.swal("","Please signup before assessment","error");

        event.preventDefault();

      }
    });
    $log.debug('runBlock end');
  }

})();
