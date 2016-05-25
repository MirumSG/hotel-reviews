'use strict';

angular.module('HotelReview')
  .factory('moment', function($window) {
    return $window.moment;
  });
