'use strict';

/**
 * @ngdoc overview
 * @name HotelReview
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('HotelReview', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize', 'ion-gallery'])

    .run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {
            // save to use plugins here
        });

        // add possible global event handlers here
    })

    .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');

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
                        templateUrl: 'templates/views/home.html',
                        controller: 'HomeController as home'
                    }
                }
            })
            .state('app.review', {
                url: '/review',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/review.html',
                        controller: 'ReviewController as review'
                    }
                }
            })
            .state('app.gallery', {
                url: '/gallery',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/gallery.html',
                        controller: 'GalleryController as gallery'
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/settings.html',
                        controller: 'SettingsController'
                    }
                }
            });


        // redirects to default route for undefined routes
        $urlRouterProvider.otherwise('/app/home');
    });


