'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('HotelReview')
    .controller('HomeController', function($scope, ExampleService,$ionicPlatform, $ionicPopup, $cordovaGeolocation) {
      var map;
      var marker;
      var myLatlng;
      var markerDict = [];
      var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
      }
      var posOptions = {timeout: 10000, enableHighAccuracy: false};


      $ionicPlatform.ready(function(){
        initializeAll();
        loadMap();
        });

        function loadMap(){
          //initialize map
          map = new google.maps.Map(document.getElementById("MapContainer"), myOptions);
          // map.setCenter({lat: 3.157871, lng: 101.708769});
          try{
            $cordovaGeolocation
             .getCurrentPosition(posOptions)
             .then(function (position) {
               console.log(JSON.stringify(position));
               var lat  = position.coords.latitude
               var long = position.coords.longitude
               myLatlng = {lat: position.coords.latitude, lng: position.coords.longitude};
               // center the map view
               map.setCenter(myLatlng);
             }, function(err) {
               // error
               console.log(JSON.stringify(err));
               console.log(err);
             });

             try {
               navigator.geolocation.getCurrentPosition(function(position){
                 console.log(position);
                  //  myLatlng = {lat: position.coords.latitude, lng: position.coords.longitude};
                  //  // center the map view
                  //  map.setCenter(myLatlng);
               });
             } catch (e) {
               console.log(e);
             } finally {

             }

          }
          catch(e){
            console.log(JSON.stringify(e))
          }
          // get current location
        }

        function initializeAll(){
          $scope.myHTML = null;
          $scope.range = 1;
          // $scope.fetchRandomText = function() {
          //     ExampleService.doSomethingAsync()
          //         .then(ExampleService.fetchSomethingFromServer)
          //         .then(function(response) {
          //             $scope.myHTML = response.data.text;
          //             // close pull to refresh loader
          //             console.log(response.data);
          //             $scope.$broadcast('scroll.refreshComplete');
          //         });
          // };

          // $scope.fetchRandomText();

          // get user location via web
          // $scope.GetCurrentLocation = function(){
          //   try {
          //     navigator.geolocation.getCurrentPosition(function(position){
          //       console.log(position)
          //       ExampleService.doSomethingAsync()
          //           .then(ExampleService.searchNearybyHotel(position.coords.latitude,position.coords.longitude))
          //           .then(function(response) {
          //               console.log(response);
          //           });
          //     });
          //   } catch (e) {
          //     console.log(e);
          //   } finally {
          //
          //   }
          // }


            function callback(results, status) {
              markerDict = [];
              console.log(results);

              if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  var marker = new google.maps.Marker({
                    map: map,
                    position: results[i].geometry.location
                  });
                  // var name = results[i].name;
                  // var refNo = results[i].reference;
                  // var hotel = results[i];

                  google.maps.event.addListener(marker, 'click', function(e){

                    for (var i = 0; i < markerDict.length; i++) {
                      if (markerDict[i].latlng.equals(e.latLng)) {

                        ExampleService.GetHotelReviewByRef(markerDict[i].refNo)
                            .then(function(response) {

                                $scope.ReviewData = response.data.result;
                                ExampleService.GetImagePhoto($scope.ReviewData.photos[0].photo_reference).then(function(res){
                                  $scope.ReviewData['IMAGEURI'] = res;
                                })
                                console.log($scope.ReviewData)
                            });
                      }
                    }
                  });
                  markerDict.push({"marker":marker,"refNo":results[i].reference,"latlng":results[i].geometry.location});
                }
              }
            }


            // to get the data
            $scope.ClearMap = function(){
              var range = 5;
              console.log(range);
              if (markerDict.length>0) {
                for (var i = 0; i < markerDict.length; i++) {
                  markerDict[i].marker.setMap(null);
                }
              }
                $cordovaGeolocation
                 .getCurrentPosition(posOptions)
                 .then(function (position) {
                   console.log(position)
                   myLatlng = {lat: position.coords.latitude, lng: position.coords.longitude};
                  //  myLatlng = {lat: 3.157871, lng: 101.708769};
                   map.setCenter(myLatlng);

                   var request = {
                       location: myLatlng,
                       radius: (1000),
                       types: ['lodging']
                   };
                   // infowindowPlace = new google.maps.InfoWindow();
                   var service = new google.maps.places.PlacesService(map);
                   service.nearbySearch(request, callback);
                 }, function(err) {
                   // error
                 });
              //     navigator.geolocation.getCurrentPosition(function(position){
              //     console.log(position)
              //     // myLatlng = {lat: position.coords.latitude, lng: position.coords.longitude};
              //     myLatlng = {lat: 3.157871, lng: 101.708769};
              //     map.setCenter(myLatlng);
              //
              //     var request = {
              //         location: myLatlng,
              //         radius: (1000),
              //         types: ['lodging']
              //     };
              //     // infowindowPlace = new google.maps.InfoWindow();
              //     var service = new google.maps.places.PlacesService(map);
              //     service.nearbySearch(request, callback);
              // });
            }
        }

    });
