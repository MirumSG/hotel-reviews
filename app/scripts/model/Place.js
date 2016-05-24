/**
 * Created by rihdus on 21/5/16.
 */

angular.module('HotelReview')
    .provider('Place', [
        function () {
            "use strict";
            var PLACES_API_KEY = ''
                ;
            return {
                setAPI_KEY: function (key) {
                    PLACES_API_KEY = key;
                },
                $get: function PlaceFactory() {
                    "use strict";
                    var placePhotoOptions = {
                        preview: {
                            maxHeight: 200
                        },
                        detail: {
                            maxHeight: 500
                        }
                    };

                    function Place(attrs) {
                        var self = this;

                        angular.extend(self, attrs)
                    }

                    Place.prototype.getPreviewPhotoUrl = function () {
                        return (this.photos && this.photos.length > 0)
                            ? this.photos[0].getUrl(placePhotoOptions.preview)
                            : null
                            ;
                    };

                    Place.prototype.getBannerPhotoUrl = function () {
                        return (this.photos && this.photos.length > 0)
                            ? this.photos[0].getUrl(placePhotoOptions.detail)
                            : null
                            ;
                    };

                    Place.prototype.getPhotoUrl = function (photo) {
                        return photo.getUrl(placePhotoOptions.detail)
                    };
                    
                    Place.prototype.getReviewTimeStamp = function (timestamp) {
                        return new Date(timestamp).toDateString()
                    };

                    return Place;

                }
            }
        }])
;