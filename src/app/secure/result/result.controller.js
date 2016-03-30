(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .controller('ResultController',ResultController);

  /** @ngInject */
  function ResultController(localStorageService,$log,$state,authService) {
    var vm = this;
  }
})();
