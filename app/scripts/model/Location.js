/**
 * Created by rihdus on 21/5/16.
 */

angular.module('HotelReview')
    .factory('Location', [
        function LocationFactory() {
            "use strict";
            return Location;

            function Location(lat, long) {
                var self = this;

                angular.extend(self, {
                    lat: lat,
                    lng: long
                })
            }

        }])
;