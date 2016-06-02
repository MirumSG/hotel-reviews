'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('HomeController', function($scope, $state, HotelService, ReviewService, GalleryService) {
        var home = this;
        home.listHotels = function() {
            var searchParams = {
                    checkInDate: '2016-12-01',
                    checkOutDate: '2016-12-03',
                    room1: 2
            };
            HotelService.getCurrentLocation().then(function(position) {         
                searchParams.latitude = position.coords.latitude;
                searchParams.longitude = position.coords.longitude;                
                HotelService.getAllHottelsByLocation(searchParams)
                    .then(function(response) {
                        home.hotelList = response.data.hotelList;
                        console.log(response.data)
                            // close pull to refresh loader
                        $scope.$broadcast('scroll.refreshComplete');
                    });
            }, function(error) {
                console.log(error);
            });
        };

        home.listHotels();
        
        home.selectHotelForReview = function(hotel){            
            ReviewService.setHotelIdForRiview(hotel);
             $state.go('app.review');
        }
         
        home.selectHotelForGallery = function(hotel){            
            GalleryService.setHotelIdForInfo(hotel);
             $state.go('app.gallery');
        }
    });