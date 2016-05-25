'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:SavedController
 * @description
 * # SavedController
 */
angular.module('HotelReview')
  .controller('SavedController', ['$scope', 'APP_CONFIG', '$log', '$localStorage', function($scope, APP_CONFIG, $log, $localStorage) {
    this.hotels = false;
    this.title = APP_CONFIG.TITLE + ' - Saved';

    this.loadSavedHotels = function(){
      this.hotels = $localStorage.bookmarks;
      $log.debug(this.hotels);
      if(!this.hotels || typeof(this.hotels) == 'undefined') {
        this.hotels = [];
      }
    };

    this.loadSavedHotels();

    $scope.$on('SAVED_NEW_HOTEL', function(data){
      this.loadSavedHotels();
    })
  }]);
