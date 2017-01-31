'use strict';

/**
 * @ngdoc overview
 * @name HotelReview
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

// angular.module('HotelReview', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize'])
angular.module('HotelReview', ['ionic','ngCordova'])

    .run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {
          if(window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);


            }
            if(window.StatusBar) {
              StatusBar.styleDefault();
            }

            try{
              navigator.geolocation.getCurrentPosition(function(position){
                console.log(position);
              });
            }
            catch(e){
              console.log(JSON.stringify(e))
            }
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
                        controller: 'HomeController'
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
