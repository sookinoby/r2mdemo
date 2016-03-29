(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      }).
      state('threedigit',{
      url:'/threedigit/:type',
      templateUrl:'app/secure/game/threedigit/threedigit.html',
      controller:'threeDigitGameController',
      controllerAs: 'threeCtrl',
      authenticate:true
    }).
    state('typespeed',{
      url:'/typespeed',
      templateUrl:'app/secure/game/typespeed/typespeed.html',
      controller:'typeSpeedController',
      controllerAs: 'typeCtrl',
      authenticate:true
    }).
    state('reportissue',{
      url:'/reportissue/',
      templateUrl:'app/secure/game/threedigit/report_issue.html',
      controller:'threeDigitGameController',
      controllerAs: 'threeCtrl',
      authenticate:true
    });

    $urlRouterProvider.otherwise('/');
  }

})();
