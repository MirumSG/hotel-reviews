'use strict';

/**
 * @ngdoc overview
 * @name HotelReview
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('HotelReview', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize'])
    .constant('APP_CONFIG', {
        TITLE: 'Hotel Reviews'
    })
    .run(['$ionicPlatform', function($ionicPlatform) {

        $ionicPlatform.ready(function() {
            // save to use plugins here
        });

        // add possible global event handlers here

    }])

    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
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
                        templateUrl: 'templates/views/home.html'
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
        $urlRouterProvider.otherwise('/app/home');
    }]);


