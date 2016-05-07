/* global malarkey:false, toastr:false, moment:false */

(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .constant('CONSTANT_DATA', {
      oauth_url: 'http://r2mworks.azurewebsite.net/api/',
      business_url: 'http://road2mathdemo.cloudapp.net:8080/dev/',
      local_url: 'app/secure/game/threedigit/scripts/game_data/',
      delay_three_digit: 1000
    });

})();
