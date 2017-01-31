'use strict';

/**
 * @ngdoc function
 * @name HotelReview.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('HotelReview')
    // use factory for services
    .factory('ExampleService', function($http, $timeout, $q) {

        var kindOfPrivateVariable = 42;

        var doSomethingAsync = function() {
            var deferred = $q.defer();
            $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
            return deferred.promise;
        };

        var fetchSomethingFromServer = function() {
            return $http({
                    url: 'http://hipsterjesus.com/api',
                    params: {
                        paras: 2
                    },
                    method: 'GET'
                })
                .success(function(data) {
                    console.log('fetched this stuff from server:', data);
                })
                .error(function(error) {
                    console.log('an error occured', error);
                });
        };

        var GetHotelReviewByRef = function(refNo){
          try {
            var ApiKey = "AIzaSyARv1JaQy4uY5vwvBcFyStzMTfaLld_QwM"
            return $http({
                    url: 'https://maps.googleapis.com/maps/api/place/details/json?reference='+refNo+'&key='+ApiKey,
                    method: 'GET'
                })
                .success(function(data) {
                    // console.log('fetched this stuff from server:', data);
                })
                .error(function(error) {
                    // console.log('an error occured', error);
                });
          } catch (e) {

          }
        }


        var GetImagePhoto = function(photo_ref_no){
          try {
            var ApiKey = "AIzaSyARv1JaQy4uY5vwvBcFyStzMTfaLld_QwM"
            return $http({
                    url: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photo_ref_no+'&key='+ApiKey,
                    method: 'GET'
                })
                .success(function(data) {
                    // console.log('fetched this stuff from server:', data);
                })
                .error(function(error) {
                    // console.log('an error occured', error);
                });
          } catch (e) {

          }
        }


        // public api
        return {
            doSomethingAsync: doSomethingAsync,
            fetchSomethingFromServer: fetchSomethingFromServer,
            GetHotelReviewByRef : GetHotelReviewByRef,
            GetImagePhoto : GetImagePhoto
        };

    });
