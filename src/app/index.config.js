(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .config(config);

  /** @ngInject */
  function config($logProvider,$httpProvider,$locationProvider,$mdThemingProvider,$translateProvider,tmhDynamicLocaleProvider,LOCALES) {
    // Enable log

    $logProvider.debugEnabled(true);
    $httpProvider.defaults.timeout = 8000;
    $httpProvider.defaults.headers.common = {};
   // $httpProvider.defaults.headers.post = {};
   // $httpProvider.defaults.headers.put = {};
   // $httpProvider.defaults.headers.patch = {};

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //  $httpProvider.interceptors.push('authInterceptorService');
    $locationProvider.html5Mode(false);
    $mdThemingProvider
      .theme('default')
      .primaryPalette('indigo')
      .accentPalette('light-green');
    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useStaticFilesLoader({
      prefix: 'app/resources/locale-',// path to translations files
      suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage(LOCALES.preferredLocale);// is applied on first load
    $translateProvider.useLocalStorage();// saves selected language to localStorage
    tmhDynamicLocaleProvider.localeLocationPattern('../bower_components/angular-i18n/angular-locale_{{locale}}.js');
  }

})();
