'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('GalleryController', function($scope, HotelService, GalleryService) {
        var gallery = this;
        gallery.selectedHotel = GalleryService.getHotelIdForInfo();
        gallery.listHotelPhotos = function() {
            var searchParams = {
                hotelId: gallery.selectedHotel.hotelId
            };
            GalleryService.getHotelInfoAndGallery(searchParams)
                    .then(function(response) {
                        gallery.photoList = []
                        angular.forEach(response.data.photos, function(photo){
                            gallery.photoList.push({url: 'https://images.trvl-media.com'+photo.url, thumb: 'https://images.trvl-media.com'+photo.thumbnailUrl, sub:photo.displayText})                            
                        });
                        // close pull to refresh loader
                        $scope.$broadcast('scroll.refreshComplete');
                    
            }, function(error) {
                console.log(error);
            });
        };

        gallery.listHotelPhotos();
    });