'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('HomeController', ['$scope', 'ExampleService', 'APP_CONFIG', '$ionicPopover', '$log', function($scope, ExampleService, APP_CONFIG, $ionicPopover, $log) {
        var ctrl = this;
        ctrl.myHTML = null;
        ctrl.title = APP_CONFIG.TITLE;

        ctrl.fetchRandomText = function() {
            ExampleService.doSomethingAsync()
                .then(ExampleService.fetchSomethingFromServer)
                .then(function(response) {
                    ctrl.myHTML = response.data.text;
                    // close pull to refresh loader
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        ctrl.fetchRandomText();

        $ionicPopover.fromTemplateUrl('filter-popover.html', {
                scope: $scope
              }).then(function(popover) {
                $log.debug("Filter popover has opened");
                $log.debug(popover)

                ctrl.filterPopover = popover;
              });

        $ionicPopover.fromTemplateUrl('sort-popover.html', {
                scope: $scope
              }).then(function(popover) {
                ctrl.sortPopover = popover;
              });

        ctrl.showFilter = function(e){
            ctrl.filterPopover.show(e);
        };
        ctrl.showSort = function(e){
            ctrl.sortPopover.show(e);
        };
    }]);
