'use strict';

/**
 * @ngdoc overview
 * @name HotelReview
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('HotelReview', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize', 'gplace', 'ngStorage', 'uiGmapgoogle-maps', 'angular-cache'])
    .constant('APP_CONFIG', {
        TITLE: 'Hotel Reviews'
    })
    .run(['$ionicPlatform', function($ionicPlatform) {

        $ionicPlatform.ready(function() {
            // save to use plugins here
        });

        // add possible global event handlers here

    }])

    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 'GPlaceProvider', '$localStorageProvider', 'CacheFactoryProvider', function($httpProvider, $stateProvider, $urlRouterProvider, GPlaceProvider, $localStorageProvider, CacheFactoryProvider) {
        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');
        $localStorageProvider.setKeyPrefix('hotelreview_win');
        //GPlaceProvider.setAPIKey('AIzaSyASfWpP5Cl-uhJpLfepl54pRRRHTuYT2wc');
        GPlaceProvider.setAPIKey('AIzaSyDape0jV390rLykygSVTSEJAlXADBGNCFQ');
        angular.extend(CacheFactoryProvider.defaults, { maxAge: 60 * 60 * 1000 });
        // Application routing
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/main.html',
                controller: 'MainController'
            })
            .state('app.home', {
                url: '/home',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/home.html'
                    }
                }
            })
            .state('app.saved', {
                url: '/saved',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/saved.html'
                    }
                }
            })
            .state('app.detail', {
                url: '/detail/:id',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/detail.html'
                    }
                }
            });


        // redirects to default route for undefined routes
        // $urlRouterProvider.otherwise('/app/detail/ChIJZRZ9yroZ2jER4R3Hm0_9Phs');
        $urlRouterProvider.otherwise('/app/home');
    }])
    .directive('uiRating', ['$log', function($log){
        return {
            template: '<span ng-bind="::rating"></span> <i ng-repeat="star in stars track by $index" class="{{star}}"></i>',
            restrict: 'A',
            scope: {},
            link: function(scope, ele, attrs){
                $log.debug('ui rating attribute has been linked');
                // 1, .5, 0, max 5
                var max = 5;
                scope.rating = 0;
                scope.stars = [];
                attrs.$observe('uiRating', function(rating){
                    $log.debug('ui rating attribute has been triggered');
                    $log.debug(rating);
                    scope.rating = rating;

                    for(var i = 1; i<= max; i++){
                        if(rating >= i){
                            scope.stars.push('ion-ios-star');
                        }else if((i - rating) < 1){
                            scope.stars.push('ion-ios-star-half');
                        }else{
                            scope.stars.push('ion-ios-star-outline');
                        }
                    }
                });
            }
        };
    }])
    .filter('fetchphoto', ['$sce', 'GPlace', function($sce, GPlace){
        return function(photoreference){
            return $sce.trustAsResourceUrl(GPlace.getPhotoUrl(photoreference));
        };
    }])
    .filter('getdomain', [function(){
        return function(input) {
            var matches,
                output = '',
                urls = /\w+:\/\/([\w|\.]+)/;

            matches = urls.exec(input);

            if (matches !== null) {
                output = matches[1];
            }

            return output;
        };
    }])
    .filter('authorprofile', ['$sce', '_', function($sce, _){
        return function(input){
            //default google plus profile
            if(!input) {
                input = 'https://lh3.googleusercontent.com/-PJNxC4CI3XA/AAAAAAAAAAI/AAAAAAAAAAA/fEFYN6-5frg/s120-c/photo.jpg';
            }
            if(_.startsWith(input, '//')){
                input = 'https:' + input;
            }
            return $sce.trustAsResourceUrl(input);
        };
    }])
    .filter('fromNow', ['moment', function(moment){
        return function(input){
            return moment.unix(input).fromNow();
        };
    }])
    ;


