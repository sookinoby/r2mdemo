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
      authenticate:true,
      calib:true
    }).
    state('calibrate',{
      url:'/calibrate',
      templateUrl:'app/secure/game/typespeed/typespeed.html',
      controller:'typeSpeedController',
      controllerAs: 'typeCtrl',
      authenticate:true
    }).
    state('reportissue',{
      url:'/reportissue/',
      templateUrl:'app/report_issues/report_issue.html',
      controller:'ReportIssueController',
      controllerAs: 'rictrl'
    })
      .state('result',{
      url:'/result/',
      templateUrl:'app/secure/result/result.html',
      controller:'ResultController',
      controllerAs: 'resctrl'
    });

    $urlRouterProvider.otherwise('/');
  }

})();
