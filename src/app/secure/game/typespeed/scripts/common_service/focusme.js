(function() {
  'use strict';
  angular.module('typeSpeedData')
    .directive('focusMe', function ($timeout, $parse) {
      return {
        link: function (scope, element, attrs) {
          var model = $parse(attrs.focusMe);
          //      console.log("testing")
          scope.$watch(model, function (value) {
            //   console.log('value=', value);
            if (value === true) {
              $timeout(function () {
                element[0].focus();
                //  console.log("testin g")
              });
            }
          });

        }
      };
    });
})();

