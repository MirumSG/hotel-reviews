'use strict';

angular.module('gplace', [])
  .provider('GPlace', [function GPlaceProvider(){
    var endpoint = 'https://maps.googleapis.com/maps/api/place/';
    var apikey = '';
    var radius = 500;
    var maxwidth = 250;

    this.setEndpoint = function(url){
      endpoint = url;
    };

    this.setAPIKey = function(key){
      apikey = key;
    };

    this.$get = ['$log', '$http', '$q', '_', 'CacheFactory', function($log, $http, $q, _, CacheFactory){
        var hotelCache = CacheFactory.createCache('hotelCache', {
          deleteOnExpire: 'aggressive',
          recycleFreq: 60000
        });
        return {
          // price and discount simulation data based on rating since google api cannot provide data
          simulatePriceAndDiscount: function(rating){
            $log.debug('simulatePriceAndDiscount ' + rating);
            var discount = _.random(0, 50);
            var price = _.random(50, 100); // price range to multiply
            if(rating > 0) {
              price *= rating;
            }
            $log.debug('price is ' + price);
            $log.debug('discount percent is ' + discount);
            var discountedPrice = price - (price * (discount/100));
            return {
              price: (discountedPrice.toFixed(2)),
              original_price: (price.toFixed(2)),
              discount: discount
            };
          },
          getPhotoUrl: function(reference, width){
            if(width === false || typeof(width) === 'undefined') {
              width = maxwidth;
            }
            return endpoint + 'photo?sensor=false&maxwidth=' + width + '&photoreference=' + reference + '&key=' + apikey;
          },
          getHotelDetail: function(placeId){
            var deferred = $q.defer();
            if(hotelCache.get('detail_' + placeId)){
              $log.debug('Hotel detail data from cache');
              deferred.resolve(hotelCache.get('detail_' + placeId));
            }else{
              $http.get(endpoint + 'details/json?placeid=' + placeId + '&key=' + apikey)
              .success(function(data , status, headers){
                $log.debug('succes');
                if(data && data.result && data.status === 'OK'){
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
          findNearByHotels: function(lat, long, r, nextPage){
            // price is simulated and photos get from place photo api
            if(r === false || typeof(r) === 'undefined') {
              r = radius;
            }
            $log.debug('finding nearby hotels');
            var cacheKey = 'l_' + lat.toString().replace('.', '_') + '$' + long.toString().replace('.', '_') + '$' + r + '$' + nextPage;
            var hotels = [];
            var deferred = $q.defer();
            var self = this;
            if(hotelCache.get(cacheKey)){
              $log.debug('Hotel list data from cache');
              deferred.resolve(hotelCache.get(cacheKey));
            }else{
              $http.get(endpoint + 'nearbysearch/json?location=' + lat + ',' + long + '&radius=' + r + '&type=hotel&name=hotels&key=' + apikey)
              .success(function(data , status, headers){
                $log.debug('succes');
                $log.debug(data);
                if(!data) return false;

                var nextPageToken = data.next_page_token;
                hotels = data.results;
                _.each(hotels, function(hotel){
                  // set price here
                  _.extend(hotel, self.simulatePriceAndDiscount(hotel.rating));
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