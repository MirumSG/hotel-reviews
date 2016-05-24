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
                 * Find near by hotels
                 * Current 'lodging' type filter is being used to find "hotel like" places.
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

                /**
                 * Fetch selected place details.
                 * */
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

                /**
                 * Fetch distance info between user location and selected hotel
                 * */
                getDistance: function (location1, location2) {
                    var deferred = $q.defer();
                    var origin1 = new google.maps.LatLng(location1.lat, location1.lng);
                    var destination1 = new google.maps.LatLng(location2.lat, location2.lng);

                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin1],
                            destinations: [destination1],
                            travelMode: google.maps.TravelMode.DRIVING,
                            // transitOptions: TransitOptions,
                            // drivingOptions: DrivingOptions,
                            unitSystem: google.maps.UnitSystem.METRIC
                        }, callback);

                    function callback(response, status) {
                        if (status == google.maps.DistanceMatrixStatus.OK) {
                            var origins = response.originAddresses;
                            var destinations = response.destinationAddresses;

                            var resultList = [];

                            for (var i = 0; i < origins.length; i++) {
                                var results = response.rows[i].elements;
                                for (var j = 0; j < results.length; j++) {
                                    var element = results[j];

                                    resultList[j] = {
                                        distance: element.distance.text,
                                        duration: element.duration.text,
                                        from: origins[i],
                                        to: destinations[j]
                                    };
                                }
                            }

                            deferred.resolve(resultList);
                        }
                        else {
                            deferred.reject(status);
                        }
                    }

                    return deferred.promise;
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

