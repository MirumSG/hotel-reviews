'use strict';

/**
 * @ngdoc service
 * @name HotelReview.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('HotelReview')
    .factory('ApiService', function($window, $location, $http, $cordovaGeolocation, API_ENDPOINTS) {

        var _apis = API_ENDPOINTS;

        var _getEndpoint = function(apiType) {
            var endPoint = $location.protocol() + $location.host() + $location.port() + 'api/v1';
            if (apiType) {
                endPoint = _apis[apiType].port ? (_apis[apiType].host + ':' + _apis[apiType].port + _apis[apiType].path) : (_apis[apiType].host + _apis[apiType].path);
                // activate for basic auth
                if (_apis[apiType].needsAuth) {
                    $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
                }
            }
            return endPoint;
        }


        var _processGetApiRequest = function(searchParams, apiType, endPath) {
         
            var _defaultSearchParams = {
                    apikey: 'L8M6jOAHeDc3h8vUb20Ak0A6pP4mnvGT'                  
                },
                _endPoint = _getEndpoint(apiType) + endPath,
                _params = searchParams ? _.assign(_defaultSearchParams, searchParams) : _defaultSearchParams;

            return $http({
                    url: _endPoint,
                    params: _params,
                    method: 'GET'
                })
                .success(function(data) {
                    console.log('fetched this stuff from server:', data);
                })
                .error(function(error) {
                    console.log('an error occured', error);
                });
        }

       

        // public api
        return {
            processGetApiRequest: _processGetApiRequest
        };

    });