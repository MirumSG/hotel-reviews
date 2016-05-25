'use strict';

/**
 * @ngdoc function
 * @name HotelReview.module:gplace
 * @description
 * # gplace module - a wrapper module of google place API
 */

angular.module('gplace', [])
  .provider('GPlace', [function GPlaceProvider(){
    var endpoint = 'https://maps.googleapis.com/maps/api/place/',
        apikey = '',
        radius = 500,
        maxwidth = 250;

    /**
     * configurable google map endpoint
     */
    this.setEndpoint = function(url){
      endpoint = url;
    };

    /**
     * configurable google map api key
     */
    this.setAPIKey = function(key){
      apikey = key;
    };

    /**
     * GPlace provider service defintion
     */
    this.$get = ['$log', '$http', '$q', '_', 'CacheFactory', function($log, $http, $q, _, CacheFactory){
        /**
         * initialize in-memory hotel cache
         */
        var hotelCache = CacheFactory.createCache('hotelCache', {
          deleteOnExpire: 'aggressive',
          recycleFreq: 60000
        });

        return {
          /**
           * price and discount simulation data based on rating since google api cannot provide data
           */
          simulatePriceAndDiscountAndReview: function(rating){
            $log.debug('simulatePriceAndDiscountAndReview ' + rating);
            var discount = _.random(0, 50);
            var price = _.random(50, 100); // price range to multiply
            if(rating > 0) {
              price *= rating;
            }
            $log.debug('price is ' + price);
            $log.debug('discount percent is ' + discount);
            var discountedPrice = price - (price * (discount/100));
            return {
              reviewsummaries: [
                {
                  name: 'Value for money',
                  rating: (_.random(1, Math.floor(rating)))
                },
                {
                  name: 'Location',
                  rating: (_.random(1, Math.floor(rating)))
                },
                {
                  name: 'Staff Performance',
                  rating: (_.random(1, Math.floor(rating)))
                },
                {
                  name: 'Hotel condition/cleanliness',
                  rating: (_.random(1, Math.floor(rating)))
                },
                {
                  name: 'Room comfort/Standard',
                  rating: (_.random(1, Math.floor(rating)))
                },
                {
                  name: 'Food/Dining',
                  rating: (_.random(1, Math.floor(rating)))
                }
              ],
              total_review: (_.random(0, 10)),
              price: (discountedPrice.toFixed(2)),
              original_price: (price.toFixed(2)),
              discount: discount
            };
          },
          /**
           * construct and return finalized url based on photo reference
           */
          getPhotoUrl: function(reference, width){
            if(width === false || typeof(width) === 'undefined') {
              width = maxwidth;
            }
            return endpoint + 'photo?sensor=false&maxwidth=' + width + '&photoreference=' + reference + '&key=' + apikey;
          },

          /**
           * hotel detail with cache implementation
           */
          getHotelDetail: function(placeId){
            var self = this;
            var deferred = $q.defer();
            if(hotelCache.get('detail_' + placeId)){
              $log.debug('Hotel detail data from cache');
              deferred.resolve(hotelCache.get('detail_' + placeId));
            }else{
              $http.get(endpoint + 'details/json?placeid=' + placeId + '&key=' + apikey)
              .success(function(data , status, headers){
                $log.debug('succes');
                if(data.status !== 'OK') {
                  return deferred.reject(data.error_message);
                }

                if(data && data.result && data.status === 'OK'){
                  _.extend(data.result, self.simulatePriceAndDiscountAndReview(data.result.rating));
                  hotelCache.put('detail_' + placeId, data.result);
                  deferred.resolve(data.result);
                }
                deferred.reject(data);
              })
              .error(function(data){
                $log.debug('error fetching hotel detail');
                deferred.reject(data);
              });
            }
            return deferred.promise;
          },
          /**
           * get list of nearby hotel with cache implementation
           */
          findNearByHotels: function(lat, lng, r, nextPage){
            // price is simulated and photos get from place photo api
            $log.debug('nextPage is ' + nextPage);
            if(r === false || typeof(r) === 'undefined') {
              r = radius;
            }
            if(nextPage === false || typeof(nextPage) === 'undefined'){
              nextPage = '';
            }
            $log.debug('finding nearby hotels');
            var cacheKey = 'l_' + lat.toString().replace('.', '_') + '$' + lng.toString().replace('.', '_') + '$' + r + '$' + nextPage;
            var hotels = [];
            var deferred = $q.defer();
            var self = this;
            if(hotelCache.get(cacheKey)){
              $log.debug('Hotel list data from cache');
              deferred.resolve(hotelCache.get(cacheKey));
            }else{
              $http.get(endpoint + 'nearbysearch/json?location=' + lat + ',' + lng + '&radius=' + r + '&type=hotel&name=hotels&key=' + apikey + '&pagetoken=' + nextPage)
              .success(function(data , status, headers){
                $log.debug('succes');
                $log.debug(data);
                if(data.status !== 'OK') {
                  return deferred.reject(data.error_message);
                }

                var nextPageToken = data.next_page_token;
                hotels = data.results;
                _.each(hotels, function(hotel){
                  // set price here
                  _.extend(hotel, self.simulatePriceAndDiscountAndReview(hotel.rating));
                });
                var response = {
                  hotels: hotels,
                  nextPageToken: nextPageToken
                };
                hotelCache.put(cacheKey, response);
                deferred.resolve(response);
              })
              .error(function(data){
                $log.debug('error fetching nearby hotels');
                deferred.reject(data);
              });
            }
            return deferred.promise;
          }
        };
    }];
  }]);