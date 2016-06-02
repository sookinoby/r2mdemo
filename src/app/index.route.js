(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'loginCtrl'
      })
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        authenticate: true
      }).
      state('threedigit',{
      url:'/threedigit/:type',
      params: {'type': null},
      templateUrl:'app/secure/game/threedigit/threedigit.html',
      controller:'threeDigitGameController',
      controllerAs: 'threeCtrl',
      authenticate:true,
      calib:true,
      child_required:true
    }).
    state('calibrate',{
      url:'/calibrate',
      templateUrl:'app/secure/game/typespeed/typespeed.html',
      controller:'typeSpeedController',
      controllerAs: 'typeCtrl',
      authenticate:true,
      child_required:true
    }).
    state('reportissue',{
      url:'/reportissue/',
      templateUrl:'app/report_issues/report_issue.html',
      controller:'ReportIssueController',
      controllerAs: 'riCtrl'
    })
      .state('result',{
      url:'/result/',
      templateUrl:'app/secure/result/result.html',
      controller:'ResultController',
      controllerAs: 'resctrl',
      authenticate:true,
      calib:true
    });


    $urlRouterProvider.otherwise('/');
  }

})();
