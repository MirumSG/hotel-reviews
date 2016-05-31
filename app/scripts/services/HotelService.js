'use strict';

/**
 * @ngdoc function
 * @name HotelReview.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('HotelReview')
    // use factory for services
    .factory('HotelService', function($http, $cordovaGeolocation, $timeout, $q, ApiService) {


        var _getCurrentLocation = function() {
            var options = {
                timeout: 10000,
                enableHighAccuracy: false
            };
            return $cordovaGeolocation
                .getCurrentPosition(options);
        }

        var _getAllHotelsByLocation = function(searchParams) {
            return ApiService.processGetApiRequest(searchParams, 'mhotels', '/search');
        }

        var _getAllHotelsByRegion = function() {
            var _defaultSearchParams = {
                maxhotels: 100,
                regionids: ['178279'],
                radius: '50km'
            }
        }

        var _getAllHotelsByCity = function() {
            var _defaultSearchParams = {
                maxhotels: 100,
                city: 'Singapore',
                radius: '70km'
            }
        }

        var _getHotelsByIds = function() {
            var _defaultSearchParams = {
                hotelids: ['178279']
            }
        }


        var _getHotelById = function() {
            var _defaultSearchParams = {
                noOfReviewsToShow: 10,
                hotelId: '15490'
            }
        }

        var _getHotelInfoById = function() {
            var _defaultSearchParams = {
                noOfReviewsToShow: 10,
                hotelId: 15490
            }
        }

        var _getReviewsByHotelId = function() {
            var _defaultSearchParams = {
                items: 100,
                sortBy: 'DATEASC',
                hotelId: 15490
            }
        }

        // public api
        return {
            getCurrentLocation: _getCurrentLocation,
            getAllHottelsByLocation: _getAllHotelsByLocation,
            getAllHottelsByRegion: _getAllHotelsByRegion,
            getHottelByIds: _getHotelById,
            getHotelInfoById: _getHotelInfoById
        };

    });