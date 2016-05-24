/**
 * Created by rihdus on 21/5/16.
 */

angular.module('HotelReview')
    .service('MapService', [
        function () {
            "use strict";
            var mapList = {};

            this.registerMap = function (name, map) {
                mapList[name] = map;
            };

            this.getMapByName = function (name) {
                return mapList[name];
            };

            this.removeMapByName = function (name) {
                if (mapList[name]) {
                    delete mapList[name];
                }

            }
        }
    ])

    .directive('gMap', [
        '$timeout', 'Location', 'MapService',
        function ($timeout, Location, MapService) {
            "use strict";
            var mapInitConfig = {
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            return {
                replace: false,
                link: {
                    post: function ($scope, $elem, $attrs) {
                        var map
                            , initLocation = $scope.location || new Location(1.3113571, 103.8347597)
                            , mapName = $attrs.name
                            ;

                        _initGMap(initLocation.lat, initLocation.lng);

                        $scope.$watch('location', function (newLoc, oldLoc) {
                            if (newLoc && !_.isEqual(newLoc, oldLoc)) {
                                if (!map) {
                                    _initGMap(newLoc.lat, newLoc.lng);
                                }
                                _panTo(newLoc);
                            }
                        });

                        function _initGMap(lat, lng) {
                            var latLng = new google.maps.LatLng(lat, lng);
                            var mapOptions = angular.extend(mapInitConfig, {
                                center: latLng
                            });

                            $timeout(function () {
                                map = new google.maps.Map($elem[0], mapOptions);
                                MapService.registerMap(mapName, map);
                                $scope.onMapReady(map);
                            });

                            $scope.$on('$destroy', function () {
                                MapService.removeMapByName();
                            })
                        }

                        function _resizeMap() {
                            google.maps.event.trigger(map, 'resize');
                        }

                        function _panTo(newLocation) {
                            var latLng = new google.maps.LatLng(newLocation.lat, newLocation.lng);
                            console.log(newLocation);
                            map.setCenter(latLng);
                        }
                    }
                },
                template: '<div></div>',
                scope: {
                    location: '=',
                    onMapReady: '&'
                }
            };
        }
    ])
;
