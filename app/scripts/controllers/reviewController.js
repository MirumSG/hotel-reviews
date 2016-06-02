'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('ReviewController', function($scope, HotelService, ReviewService) {
        var review = this;
        review.range = _.range;
        review.selectedHotel = ReviewService.getHotelIdForRiview();
        review.listHotelReviews = function() {
            var searchParams = {
                items: 100,
                sortBy: 'DATEASC',
                hotelId: review.selectedHotel.hotelId
            }
            ReviewService.getReviewsByHotelId(searchParams)
                    .then(function(response) {
                        review.reviewResponse = response.data.reviewDetails;
                        // close pull to refresh loader
                        $scope.$broadcast('scroll.refreshComplete');
                    
            }, function(error) {
                console.log(error);
            });
        };

        review.listHotelReviews();
    });