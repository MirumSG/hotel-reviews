'use strict';

/**
 * @ngdoc function
 * @name HotelReview.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('HotelReview')
    // use factory for services
    .factory('ReviewService', function($http, $timeout, $q, ApiService) {

        var _selectedHotel = {};

        var _getReviewsByHotelId = function(searchParams) {
            return ApiService.processGetApiRequest(searchParams, 'reviews', '/hotels');
        }
        var _setHotelIdForRiview = function(hotel) {
            _selectedHotel = hotel;
        }
        var _getHotelIdForRiview = function() {
            return _selectedHotel;
        }

        return {
            getReviewsByHotelId: _getReviewsByHotelId,
            setHotelIdForRiview: _setHotelIdForRiview,
            getHotelIdForRiview: _getHotelIdForRiview
        };

    });