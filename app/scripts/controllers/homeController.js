'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('HomeController', ['$scope', '_', 'APP_CONFIG', '$ionicPopover', '$log', 'GPlace', '$cordovaGeolocation', '$ionicPopup', function($scope, _, APP_CONFIG, $ionicPopover, $log, GPlace, $cordovaGeolocation, $ionicPopup) {
        
        var ctrl = this;
        var originalHotels = [];
        this.nextPageToken = false;
        this.hotels = false;
        this.title = APP_CONFIG.TITLE;
        this.filter = {
            name: '',
            rating: 0,
            minprice: 0
        };
        this.sort = false;
        this.moreHotelCanBeLoaded = true;
        // default to bugis
        this.lat = 1.2995212;
        this.lng = 103.8535033;

        this.loadHotels = function(){
            $log.debug("Loading hotels " + ctrl.lat + ' - ' + ctrl.lng + ' - ' + ctrl.nextPageToken);
            GPlace
              .findNearByHotels(ctrl.lat, ctrl.lng, 400, false, ctrl.nextPageToken)
              .then(function(data) {
                originalHotels = data.hotels;
                ctrl.nextPageToken = data.nextPageToken;
                
                if(!originalHotels || originalHotels.length < 20){
                    // this.moreHotelCanBeLoaded = false;
                }
                if(ctrl.filter.name){
                    originalHotels = _.filter(originalHotels, function(hotel){
                        return hotel.name.toLowerCase().indexOf(ctrl.filter.name.toLowerCase()) > -1;
                    });
                }
                if(ctrl.filter.rating){
                    originalHotels = _.filter(originalHotels, function(hotel){
                        console.log(ctrl.filter.rating + " === " + hotel.rating);
                        return hotel.rating >= ctrl.filter.rating;
                    });
                }
                if(ctrl.filter.minprice){
                    originalHotels = _.filter(originalHotels, function(hotel){
                        return hotel.price >= ctrl.filter.minprice;
                    });
                }

                if(ctrl.sort){
                    if(ctrl.sort == 1){
                        originalHotels = _.sortBy(originalHotels, "price");
                    }else if(ctrl.sort == 2){
                        originalHotels = _.sortBy(originalHotels, "price").reverse();
                    }else if(ctrl.sort == 3){
                        originalHotels = _.sortBy(originalHotels, "rating").reverse();
                    }
                }
                ctrl.hotels = angular.copy(originalHotels);
              }, function(err) {
                $log.debug(err);
              });
            // originalHotels = [{price:90,discount:10,original_price:100,geometry:{location:{lat:1.2982839,lng:103.8548987}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",id:"b905db6d461ef95b4cefd9f040525c363a55414e",name:"InterContinental Singapore",photos:[{height:960,html_attributions:["<a href='https://maps.google.com/maps/contrib/118421376990775149240/photos'>Kenathan WONG</a>"],photo_reference:"CoQBcwAAAF0x4nlTThUk6d4gtDW1phWPLfq7aTjf7xw8agpw5Iybu4hWY72uWNz3LG_Zh5liZ30eKJZdxHxbItUU_yC8J4GZiGfVgJQgkPX1399jXg_vumD4jfNN7YBIsWZP4qeupkqARZHV0EDe7eHxZEIyrw_mV_mw7T9ysUk8-YDt-DgqEhAcnz5jj3JFvH3BbE_xjh4CGhSIEAOHEtGp8htkCCKXK_7PCkcugg",width:1280}],place_id:"ChIJZRZ9yroZ2jER4R3Hm0_9Phs",rating:4.3,reference:"CnRtAAAAaVeqrj6JtgeftPobSBHRPZcBmtvTCtJ65TvHdio-wZs0Z8BJEZ7zSNdV-P5_i8laGAGxWQzmLCpjATHMuqcIRFqrAlkyZ7N-Q9Gbrr-8NT6upiZI7obGG-Iwl8vIqMimBPBKdlV_eD0iyssYJxxeMxIQ__9JDDatrxFdKQZtjNQaWBoUAc7g3tVJ2o1BYas5AqPgY4zRwE8",scope:"GOOGLE",types:["lodging","point_of_interest","establishment"],vicinity:"80 Middle Road, Singapore"},{price:225,discount:10,original_price:250,geometry:{location:{lat:1.295939,lng:103.852714}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",id:"763985adc56150d3a04a828725b5850f54663b5d",name:"Carlton Hotel",photos:[{height:1000,html_attributions:["<a href='https://maps.google.com/maps/contrib/110693543847355349422/photos'>Carlton Hotel</a>"],photo_reference:"CoQBcwAAAFcil1dXDmTkV4hgj_PWDKbgSdhjKzJ0F34H9UyWpCnojTKfVqQJX78e5eFGoXAc6VNUuj9O2xLz2T1jHgl4YLkVITxvGzroykGkLfULhnUlQFMZWLn2nZzokc3-m2XeVys22JYCHfPdA6ls87wJMcD4zLBg5C1Rbrzw5D7W99_-EhBwiEWgh2T8LR1q0DYg60EHGhQH5JqbZeKoc0POO-vl2ebNFv783Q",width:1500}],place_id:"ChIJoeV2WKQZ2jERvqFd1_XG4jg",rating:4.2,reference:"CmRgAAAA7jLOGuxzXg18NbbX9g7DMIPUPsOLnO6FFEpTagzXcT7dOUu2AUXxz2FS1MrXp9kbe06D6ZHOT898jvkLkG8ib_UUsnPvOXGItA5M7m-iq6mPrAg8xX5VQicB8GTSfTT7EhAG6Lx0WRzTh6B-Utd2ZbweGhTkSQEW8H876PKzb1iimtDD6qQmVA",scope:"GOOGLE",types:["lodging","point_of_interest","establishment"],vicinity:"76 Bras Basah Road"}];
        };
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
              ctrl.lat  = position.coords.latitude;
              ctrl.lng = position.coords.longitude;
              ctrl.loadHotels();
            }, function(err) {
              // cannot get geolocation, use bugis as default
              $ionicPopup.show({
                'template': '<p>Cannot get location. Bugis place is default</p>',
                'title': 'Geolocation Error',
                buttons: [
                  { text: 'Ok' }
                ]
              });

              ctrl.loadHotels();
            });

        

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

        this.showFilter = function(e){
            this.filterPopover.show(e);
        };
        this.showSort = function(e){
            this.sortPopover.show(e);
        };
        this.cancelFilter = function(){
            this.filterPopover.hide();
        };
        this.applyFilter = function(){
            this.loadHotels();
            this.filterPopover.hide();
        };
        this.setFilterRating = function(rating) {
            if(this.filter.rating == rating)
                this.filter.rating = 0;
            else
                this.filter.rating = rating;
        };
        this.applySort = function(sortby){
            this.sort = sortby;
            this.loadHotels();
            this.sortPopover.hide();
        };
    }]);
