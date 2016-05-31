'use strict';

/**
 * @ngdoc constant
 * @name HotelReview.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('HotelReview')

    // development
    .constant('API_ENDPOINTS', {
        mhotels:  {
            host: 'http://terminal2.expedia.com',
            port:'80',
            path: '/x/mhotels',
            needsAuth: false
            },
        hotels: {
            host: 'http://terminal2.expedia.com',
            port:'80',
            path: '/x/hotels',
            needsAuth: false
            },
        reviews: {
            host: 'http://terminal2.expedia.com',
            port:'80',
            path: '/x/reviews',
            needsAuth: false
            }
    });
    
    // live example with HTTP Basic Auth
    /*
    .constant('API_ENDPOINT', {
        host: 'http://myserver.com',
        path: '/api/v2',
        needsAuth: true,
        username: 'whatever',
        password: 'foobar'
    });
    */

