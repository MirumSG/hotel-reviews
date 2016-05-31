'use strict';

/**
 * @ngdoc function
 * @name HotelReview.serive:ExampleService
 * @description
 * # ExampleService
 */
angular.module('HotelReview')
    // use factory for services
    .factory('GalleryService', function($http, $timeout, $q, ApiService) {

        var _selectedHotel = {};

        var _getHotelInfoAndGallery = function(searchParams) {
            return ApiService.processGetApiRequest(searchParams, 'mhotels', '/info');
        }
        var _setHotelIdForInfo = function(hotel) {
            _selectedHotel = hotel;
        }
        var _getHotelIdForInfo = function() {
            return _selectedHotel;
        }

        return {
            getHotelInfoAndGallery: _getHotelInfoAndGallery,
            setHotelIdForInfo: _setHotelIdForInfo,
            getHotelIdForInfo: _getHotelIdForInfo
        };

    });