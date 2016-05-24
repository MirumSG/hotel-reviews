'use strict';

/**
 * @ngdoc function
 * @name HotelReview.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('HotelReview')
// use factory for services
    .factory('PlatformService', [
        '$ionicPlatform', '$rootScope',
        '$http', '$timeout', '$q',
        'Location',
        function ($ionicPlatform, $rootScope
            , $http, $timeout, $q
            , Location) {

            function FindCurrentGeoLocation() {
                var deferred = $q.defer();
                $rootScope.$broadcast('asyncActive', true);
                try {

                } catch (e) {
                    $rootScope.$broadcast('asyncActive:reset');
                }
                if (ionic.Platform.isWebView()) {
                    _cordovaGeoLocationFinder()
                } else {
                    _webGeoLocationFinder();
                }

                return deferred.promise;

                function _webGeoLocationFinder() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            $rootScope.$broadcast('asyncActive', false);
                            deferred.resolve(new Location(
                                position.coords.latitude,
                                position.coords.longitude));
                        }, function (error) {
                            $rootScope.$broadcast('asyncActive', false);
                            deferred.reject(error);
                        })
                    }
                }

                function _cordovaGeoLocationFinder() {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            $rootScope.$broadcast('asyncActive', false);
                            deferred.resolve(new Location(
                                position.coords.latitude,
                                position.coords.longitude));
                        }, function (error) {
                            $rootScope.$broadcast('asyncActive', false);
                            deferred.reject(error);
                        })
                    }
                }
            }

            // public api
            return {
                FindCurrentGeoLocation: FindCurrentGeoLocation
            };

        }]);
