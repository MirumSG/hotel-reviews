'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('SavedController', ['$scope', 'APP_CONFIG', '$log', '$localStorage', function($scope, APP_CONFIG, $log, $localStorage) {
        var ctrl = this;
        this.hotels = false;
        this.title = APP_CONFIG.TITLE + ' - Saved';

        this.loadHotels = function(){
            this.hotels = $localStorage.bookmarks;
        };

        this.loadHotels();
    }]);
