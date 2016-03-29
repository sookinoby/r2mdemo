/* global malarkey:false, toastr:false, moment:false */

(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .constant('CONSTANT_DATA', {
      oauth_url: 'http://r2mworks.azurewebsite.net/api/',
      business_url: 'http://r2mworks.azurewebsites.net/api/'
    });

})();
