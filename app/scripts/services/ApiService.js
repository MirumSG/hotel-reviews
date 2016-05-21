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
    .factory('ApiService', ['$q', '$http', 'MapService',
        'Place',
        'GOOGLE_PLACES_API',
        function ($q, $http, MapService
            , Place
            , GOOGLE_PLACES_API) {

            var hotelPlacesFindReqParams = {
                radius: 10000,
                key: 'AIzaSyD9tbRYaqLkmRZYG_1UBAn4sqTA13dfJAE',
                type: 'lodging'
            };

            // var googleMapPlaces = new google.maps.places.PlacesService(map);

            // public api
            return {

                /**
                 *
                 * */

                findHotelsNearBy: function (mapName, location, searchParams) {
                    var map = MapService.getMapByName(mapName);
                    var deferred = $q.defer();

                    var placesSvc = new google.maps.places.PlacesService(map);

                    var request = angular.extend(hotelPlacesFindReqParams, {
                        location: new google.maps.LatLng(location.lat, location.lng),
                        radius: searchParams.radius || hotelPlacesFindReqParams.radius
                    });

                    placesSvc.nearbySearch(request, function (results, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            var placesList = prepareSearchResults(results);
                            console.log(results);
                            deferred.resolve(placesList);
                        }
                        else {
                            deferred.reject(status);
                        }
                    });

                    return deferred.promise;
                },


                findPlaceDetails: function (mapName, placeId) {
                    var map = MapService.getMapByName(mapName);
                    var deferred = $q.defer();
                    var placesSvc = new google.maps.places.PlacesService(map);

                    var request = {
                        placeId: placeId
                    };

                    placesSvc.getDetails(request, function (place, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            deferred.resolve(new Place(place));
                        } else {
                            deferred.reject(status)
                        }
                    });
                    return deferred.promise;
                },
                getEndpoint: function () {
                    return endpoint;
                }
            };

            function prepareSearchResults(placesArray) {
                return _.chain(placesArray)
                    .map(function (place) {
                        return new Place(place);
                    })
                    .value()
                    ;
            }

        }]);

