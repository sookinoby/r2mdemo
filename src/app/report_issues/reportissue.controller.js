(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .controller('ReportIssueController', ReportIssueController);

  /** @ngInject */
  function ReportIssueController(localStorageService,$log,$state,authService) {
    var vm = this;
    if(authService.authentication.isAuth)
      this.email = authService.email;


    vm.reportIssue = function() {
      if(authService.authentication.isAuth)
    this.email = authService.email;

     }


  }
})();
