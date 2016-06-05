/* global malarkey:false, toastr:false, moment:false */

(function() {
  'use strict';

  angular
    .module('r2mdemo')
    .constant('CONSTANT_DATA', {
      oauth_url: 'http://development.road2math.com/',
      business_url: 'http://development.road2math.com/',
      local_url: 'http://localhost:3000/',
      delay_three_digit: 3000,
      delay_type_speed: 1000,
      max_count_games:4,
      mock_calls:false
      //business_url:http://development.road2math.com/
    //  business_url: 'http://road2mathdemo.cloudapp.net:8080/auth/
      //oauth_url: 'http://development.road2math.com/token'
      //
      //

      // production url
      //business_url':http://assessment.road2math.com/'
     // oauth_url: 'http://assessment.road2math.com/
      //
      //
    });

})();
