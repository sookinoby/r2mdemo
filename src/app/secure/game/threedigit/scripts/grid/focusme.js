(function() {
    'use strict';
    angular.module('threeDigitGrid')
        .directive('focusMe', function ($interval, $parse) {
        return {
            link: function (scope, element, attrs) {
                var model = $parse(attrs.focusMe);
          //      console.log("testing")
                scope.$watch(model, function (value) {
                 //   console.log('value=', value);
                    if (value === true) {
                      $interval(function () {
                            element[0].focus();
                      //    console.log("This really works for sure")
                        },500);
                    }
                });

            }
        };
    });
})();

