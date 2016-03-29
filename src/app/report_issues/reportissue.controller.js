(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .controller('ReportIssueController', ReportIssueController);

  /** @ngInject */
  function MainController(localStorageService,$log,$state,authService) {
    var vm = this;


    vm.reportIssue = function() {

    }


  }
})();
