'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('HomeController', [
        '$scope', 'Dialog', '$timeout',
        'PlatformService', 'ApiService', 'MapService',
        'PlacePreviewService',
        'Location',
        function ($scope, Dialog, $timeout
            , PlatformService, ApiService, MapService
            , PlacePreviewService
            , Location) {

            /**
             * Local storage save key for location
             * */
            var LAST_SAVED_LOCATION_KEY = 'HotelReview_last-saved_location';
            var DASHBOARD_MAP_NAME = 'dashboardMap';

            var map = null,
                mapCenterMarker = null,
                _cleanupBucket = {};

            $scope.activityStore = {};

            $scope.action = {

                /* Pick Location */
                /*---------------*/
                onPickLocationClick: function () {
                    $scope.activityStore.isUpdatingLocation = true;
                    PlatformService.FindCurrentGeoLocation()
                        .then(function (location) {
                            updateCurrentLocation(location);
                            updateMapCenterMarker(location);
                            updateNearByHotels(location, $scope.mapCtrl.nearByParams.radius);
                        })
                        .finally(function () {
                            $scope.activityStore.isUpdatingLocation = false;
                        });
                },

                /* Refresh Nearby location list */
                /*------------------------------*/
                onViewRefresh: function () {
                    updateNearByHotels($scope.mapCtrl.location, $scope.mapCtrl.nearByParams.radius)
                        .then(function () {
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                },

                /* Location Click action */
                /*-----------------------*/
                onPlaceItemClick: function (place) {
                    PlacePreviewService.showPreview(DASHBOARD_MAP_NAME, place);
                }
            };

            $scope.mapCtrl = {
                location: null,
                mapHandle: {},
                onMapReady: function () {
                    map = MapService.getMapByName(DASHBOARD_MAP_NAME);
                    _init();
                    if ($scope.mapCtrl.location) {
                        updateMapCenterMarker($scope.mapCtrl.location);
                        updateNearByHotels($scope.mapCtrl.location, $scope.mapCtrl.nearByParams.radius);
                    }
                },
                nearByParams: {
                    radius: 4000
                }
            };

            $scope.searchResults = [];

            /**
             * View constructor
             * */
            function _init() {
                var initLocation = _pickLastSavedLocation();
                if (initLocation) {
                    var location = new Location(initLocation.lat, initLocation.lng);
                    location && updateCurrentLocation(location);
                    location && updateNearByHotels(location, $scope.mapCtrl.nearByParams.radius);
                }
                $scope.$on('$destroy', _clean);
                _cleanupBucket.viewEnterWatchOff = $scope.$on('$ionicView:beforeEnter', function () {
                    // Re-render map
                })
            }

            function _clean() {
                _cleanupBucket.viewEnterWatchOff && _cleanupBucket.viewEnterWatchOff();
            }

            /**
             * Update map object with provided location.
             * */
            function updateCurrentLocation(location) {
                $scope.mapCtrl.location = location;
                window.localStorage.setItem(LAST_SAVED_LOCATION_KEY, JSON.stringify({
                    lat: location.lat,
                    lng: location.lng
                }));
            }

            /**
             * Update map center marker
             * */
            function updateMapCenterMarker(location) {
                if (!location) return;
                _initMapCenterMarker(location);
                mapCenterMarker.setOptions({
                    position: {
                        lat: location.lat,
                        lng: location.lng
                    }
                })

            }

            function _initMapCenterMarker(location) {
                if (mapCenterMarker) {
                    return;
                } else {
                    mapCenterMarker = new google.maps.Marker(
                        {
                            position: {
                                lat: location.lat,
                                lng: location.lng
                            },
                            map: map,
                            draggable: true,
                            title: 'Hello World!'
                        });
                    mapCenterMarker.addListener('dragend', function (event) {
                        var latLng = event.latLng;
                        var location = {
                            lat: latLng.lat(),
                            lng: latLng.lng()
                        };
                        updateCurrentLocation(location);
                        updateNearByHotels(location, $scope.mapCtrl.nearByParams.radius);
                    })
                }
            }

            /**
             * Pick up last saved locatino from location storage.
             * */
            function _pickLastSavedLocation() {
                var lastPickedLocation = window.localStorage.getItem(LAST_SAVED_LOCATION_KEY);
                try {
                    return JSON.parse(lastPickedLocation)
                } catch (e) {
                    return null;
                }
            }

            /**
             * Update nearby hotels list
             * */
            function updateNearByHotels(location, searchRadius) {
                if(!location) {
                    $scope.$broadcast('scroll.refreshComplete');
                }
                return ApiService.findHotelsNearBy(DASHBOARD_MAP_NAME, location, {
                    radius: searchRadius
                })
                    .then(function (response) {
                        _renderHotelList(response);

                    })
            }

            function _renderHotelList(placeList) {
                $scope.searchResults = [];
                $timeout(function () {
                    $scope.searchResults = placeList;
                }, 100);
            }


        }])
;
