'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:MainController
 * @description
 * # MainController
 * This controller handles the side menu
 */
angular.module('HotelReview')
    .controller('MainController', ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            var asyncCounter = 0;


            $rootScope.$on('asyncActive', function (event, data) {
                if (!!data) {
                    ++asyncCounter;
                } else {
                    --asyncCounter;
                }
                $rootScope.asyncActive = asyncCounter > 0;
            });

            $rootScope.$on('asyncActive:reset', function (event, data) {
                asyncCounter = 0;
                $rootScope.asyncActive = false;
            });

        }]);
