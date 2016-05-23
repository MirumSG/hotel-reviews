'use strict';

/**
 * @ngdoc function
 * @name HotelReview.controller:DetailController
 * @description
 * # DetailController
 */
angular.module('HotelReview')
  .controller('DetailController', ['APP_CONFIG', 'GPlace', '$localStorage', '$ionicPopup', '$cordovaSocialSharing', '$state', '$log', '_', function(APP_CONFIG, GPlace, $localStorage, $ionicPopup, $cordovaSocialSharing, $state, $log, _) {
      var ctrl = this;
      GPlace
        .getHotelDetail($state.params.id)
        .then(function(data) {
          $log.debug(data);
          ctrl.hotel = data;
          ctrl.map = {
            center: {
              latitude: (ctrl.hotel.geometry.location.lat), 
              longitude: (ctrl.hotel.geometry.location.lng)
            },
            zoom: 17,
            marker: {
              id: 'mapmarker',
              coords: {
                latitude: (ctrl.hotel.geometry.location.lat), 
                longitude: (ctrl.hotel.geometry.location.lng)
              }
            }
          };

        }, function(err) {
          $log.debug(err);
        });
      // this.hotel = {address_components:[{long_name:"80",short_name:"80",types:["street_number"]},{long_name:"Middle Road",short_name:"Middle Rd",types:["route"]},{long_name:"Singapore",short_name:"Singapore",types:["locality","political"]},{long_name:"Singapore",short_name:"SG",types:["country","political"]},{long_name:"188966",short_name:"188966",types:["postal_code"]}],adr_address:"<span class='street-address'>80 Middle Rd</span>, <span class='country-name'>Singapore</span> <span class='postal-code'>188966</span>",formatted_address:"80 Middle Rd, Singapore 188966",formatted_phone_number:"6338 7600",geometry:{location:{lat:1.2982839,lng:103.8548987}},icon:"https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",id:"b905db6d461ef95b4cefd9f040525c363a55414e",international_phone_number:"+65 6338 7600",name:"InterContinental Singapore",photos:[{height:960,html_attributions:["<a href='https://maps.google.com/maps/contrib/100529075178081143401/photos'>Micah Lim 林益才 Real Estate</a>"],photo_reference:"CoQBcwAAAD6bluIATAM-vE6G_CWd_wIGZ_7tHGKxIuRFQ4iseenlRgvAcODgkWbCwN0XIwu8LTQMzKAN76FtR6NBCFcanM_sUuQfaeHL_BIcfuYq9J0LrJKN9B__qroXjRmwbpVfCMptPDfjzUQai8Cskw4wALn0bAcn0QoP4zNuCJ5no1qPEhD-JDxGFS-1kFCWBDQmB9wsGhQNtURfIr0fGt6_Cb6G3iHNeCvhlQ",width:1280},{height:3200,html_attributions:["<a href='https://maps.google.com/maps/contrib/116234054007377930734/photos'>Gerald Tan</a>"],photo_reference:"CoQBcwAAAMVyzWQumZAJChZj7d8uNpiGx77depbUpLusHlHRRyOpfGnU6_yeukA3aMtQzF6Wx6KnN6-nn8xZtHdf59Y49FmfbtTOoT7aibX5slLPaAPSb_ewvIzHFNVz_aVQuLrSlBMwNFKjerTJu2x3JwFcwiUDro69fWUUvGnsMI5B6BzaEhCwR8r2MEhxtmf5C4S-5Ok2GhRM6IDVjTKhZb2-6OR3TExexaSZLQ",width:2368},{height:3024,html_attributions:["<a href='https://maps.google.com/maps/contrib/102214154328654120090/photos'>Eng Booi Eu</a>"],photo_reference:"CoQBcwAAABDWDVwu6bqKHSwVMRJLjcEuL7x-PiuukxNQXdWqgVKorIAmlC_mSWQh8yv6aigdshKegCSuzJGto3XzkfKZVMYw8PlGAmVLvkUDDq03KJWPgg1D0uy_YtAUrd0pcX3O67BEyzGkDQsyhYK8Mg4JoNgln1D-3WixJqcfT2kaxUIPEhADGd89MvzH3Leyk4PZFxj9GhS5n2cGV4UArOrvNS9H6RjAIXdJ5Q",width:4032},{height:960,html_attributions:["<a href='https://maps.google.com/maps/contrib/100529075178081143401/photos'>Micah Lim 林益才 Real Estate</a>"],photo_reference:"CoQBcwAAAEQ2MYvA02ps787xMJIC4ImTEVqP0DuZRRtWHRQ7HjwSv3S3C3afXQG2AG_id6Cvv1-X0OJdsjNxCf8g2yG_fDs6oFDfAlEyXEVCHy8hVFWjDRVr1zswmw2WEHPK--KbvRMqBF6tEB73VCR-2R3hy-Uarq9tzpDSWaQrDA10xwpNEhDlRLzX_H7XwLh7PbFgloZ-GhTprbow07bd5JULRp94UkVxSI6Wow",width:1280},{height:960,html_attributions:["<a href='https://maps.google.com/maps/contrib/100529075178081143401/photos'>Micah Lim 林益才 Real Estate</a>"],photo_reference:"CoQBcwAAALJGlF8rTKr9SOxVicSzv8o2nmzY5mq-oGXywnaImRJtuVrSZBhmWq_bQX4gaSoD9uHMJaxDTES0SHdgWIyqQKjDQBZ2FLlXb5rrEyPq80Zm4V-6gJX86qJKBiUM92tAck5pdPtEgRr3s9fbAz66nGi5qUUgOaMCTFf2HAsHTU0DEhBPtn-yE46IjmpA-nz8r9NaGhR7rwIWbdhe1x212wh-iMD5jf6zyg",width:1280},{height:960,html_attributions:["<a href='https://maps.google.com/maps/contrib/118421376990775149240/photos'>Kenathan WONG</a>"],photo_reference:"CoQBcwAAAG2ZYix5JOInj67CxM_j5EE_T1cHkgwIauvg-gy9ECnZmb68Ic7MZyPB2FClaNykHCKksYIVaV8Pyz8S2FaLTK2R_NE_LNg6StkJJqbth46kSuU1sPgydjpEcmGOmfY490uxbrX_QYfuhLrEhgVI9ux4W3mjZ_NwWCg52ZKGjXTYEhDoxmcf9KEEWevM7PK3DaSDGhSSUPdANmbJZyEbHBUJ3YrHqQGujA",width:1280},{height:1096,html_attributions:["<a href='https://maps.google.com/maps/contrib/108970910801491115764/photos'>Derek Tubg</a>"],photo_reference:"CoQBcwAAAKFfNU0uneYWI6nwRzNGFYjMUGOq6MigznXveTptq6kwXNLYgeGLAxWyD0Pf6t7IJICoyNyTJ1xNBLNt-C8UVbBDYmw9zRCddCJq-6Xaz_JlnYrtUCcSURJ5ViSyK9KCpjv2nT0oc2dVQV31QE9t_Qd1B7UTa8raGQUGWHppiA6NEhDwEQ6U-LcNeVldXoEgglQYGhRmheSCC-4MlWpmSeX1fwwQSEzzMA",width:1096},{height:361,html_attributions:["<a href='https://maps.google.com/maps/contrib/105562061292230800166/photos'>Singapore Luxury Hotels &amp; Resorts</a>"],photo_reference:"CoQBcwAAAOMjA-abOfJ2FUApOYdfgRVuJbpstdDBbyIVuIYn7NL7lGiBDYUs58syk8-tl2QVk403qw4X8PQuWBYdw4QFe3tzMHptyu2axQcTtIkFg0MRBZkDsKSnofRdCSdyje4uYGQh8A6o-2YxAKmpmNxtYK4oPCVMvSRmj7uKyXUTzckTEhCP4Bx8sGQHgYxR5bhkJjVcGhSO6UEakfhBh_rbUvRSgLnAePPHTw",width:845},{height:1280,html_attributions:["<a href='https://maps.google.com/maps/contrib/100529075178081143401/photos'>Micah Lim 林益才 Real Estate</a>"],photo_reference:"CoQBcwAAAAdVW2yAIpt4mHUOgYYVCoYexJRDI8-6jcJEgqN6SNn60hR9HK9x2l640BONfW6-7bIGVYZqP3MiqrSz3IByCkbN1scHPhMFhNsSjAGOd5tRxTBK0HOcr47inh7doSGgSDv1BKKOMUmAoHQ0Q5BixRFeAtTKqTwXCsGyLNBeGHPzEhCj374pBGjVAf3fXNpDc0vDGhSJ9A_1seEeMsWCzahBzezk2PgqoA",width:960},{height:1836,html_attributions:["<a href='https://maps.google.com/maps/contrib/116916611593922522727/photos'>Rob Paris</a>"],photo_reference:"CoQBcwAAAEtBUbFajXNdoLcdqkKq9bZEuxHA0F84iswAt-jYsmMK5m6slEiam13uT6k6ZyQQEOoe5G_8VNvLClHzkKv4PFkSigI9IiIQ2lI804WCNGQfV9D_tYC72LrAl9SK1xXInVAnYcufY6OITRz5wUvJQ1_ez5bkwAe2dBvIVdWGKcxHEhCosBbflUPvSO-03E7PpI4pGhTuiJ2Z-yq0ZFXa4lm7daKSVRkdXg",width:3264}],place_id:"ChIJZRZ9yroZ2jER4R3Hm0_9Phs",rating:4.2,reference:"CnRtAAAAZ0hhGQPiPABf9eQiMxJ5j_CV9_-4WF7Q7eY6PpjIZPbi5pASw9dAgJdWQ2Fz70Rjcs-_uzUOOxB9xjrK4ATvPsRYeoevG0jLaU7Uj_tjgb0p0e4TzSuGDdMxdzYhK1RVrpke3wX0MWoEv05Nc51QZRIQuNE1su2BzZNT0kb8l9dE_RoUyheE6JNf-fwgoLs3txtiTQX5Tak",reviews:[{aspects:[{rating:3,type:"overall"}],author_name:"Adrian Tay",author_url:"https://plus.google.com/113570569831599553471",language:"en",rating:5,text:"Lovely hotel with sizable, clean rooms which has recently undergone a refresh. Great service from staff in my last few stays. Located in a very convenient part of Singapore, access to lots of shops and food joints, as well as readily accessible public transport (Bugis MRT station).",time:1460444328},{aspects:[{rating:2,type:"overall"}],author_name:"Frank M",author_url:"https://plus.google.com/118313753665092692828",language:"en",profile_photo_url:"//lh4.googleusercontent.com/-gZJ1qtBxhBw/AAAAAAAAAAI/AAAAAAAAFfE/7a4LVfh2avE/photo.jpg",rating:4,text:"Nice hotel and has a very eccentric but premium feel, as it was built by consolidating many shoplots and they have kept some of the facades internally. Backs onto a street mall, which looks nice and is lively. Well situated in a central part of Singapore. Easy to get to a few different places. ",time:1455511082},{aspects:[{rating:3,type:"overall"}],author_name:"Valerie Valentine",author_url:"https://plus.google.com/117970851271375267232",language:"en",profile_photo_url:"//lh5.googleusercontent.com/-BlPGxjpKrhI/AAAAAAAAAAI/AAAAAAAAABU/qyc8g_KbFsg/photo.jpg",rating:5,text:"One of the best hotels in Singapore! Close proximity to great restaurants and one of the best hotel teams in the country! They always give perfect recommendations and go above and beyond the call of duty to help their guest!",time:1456057443},{aspects:[{rating:2,type:"overall"}],author_name:"Mimi Lu",author_url:"https://plus.google.com/118078117747512175721",language:"en",profile_photo_url:"//lh6.googleusercontent.com/-ziXQyFsHyAQ/AAAAAAAAAAI/AAAAAAAAB_w/PdayyPE7nbY/photo.jpg",rating:4,text:"Newly refurbished. Amazing suites, bar could do with a little gliz and glamour.",time:1461816809},{aspects:[{rating:2,type:"overall"}],author_name:"Roland Seh",author_url:"https://plus.google.com/118293145113483041992",language:"en",profile_photo_url:"//lh5.googleusercontent.com/-6hnJDA33rJ8/AAAAAAAAAAI/AAAAAAAAAB4/wSSaI6EfDzQ/photo.jpg",rating:4,text:"One of the hotel that I love visiting. The Lobby is a real great place to just let your hairs down and sip some Long Island Tea. The environment is made even more comfy by the sofas and also live piano music. If you want a bite, they do have a selection of food and also a High Tea set. A great way to nimble and share great moments with your loved ones or friends.",time:1452957428}],scope:"GOOGLE",types:["lodging","point_of_interest","establishment"],url:"https://maps.google.com/?cid=1963285005937876449",user_ratings_total:72,utc_offset:480,vicinity:"80 Middle Road, Singapore",website:"http://www.ihg.com/intercontinental/hotels/gb/en/singapore/sinhb/hoteldetail?cm_mmc=GoogleMaps-_-IC-_-SGP-_-SINHB"};
      this.savedHotels = _.chain($localStorage.bookmarks).pluck('place_id').value();
      this.saveHotel = _.debounce(function(){
        $log.debug('Saving hotel..');
        
        if(!$localStorage.bookmarks){
          $localStorage.bookmarks = [];
        }
        if($localStorage.bookmarks.length > 0){
          var theHotel = this.hotel;
          if(_.find($localStorage.bookmarks, function(bookmark){
            return bookmark.place_id === theHotel.place_id;
          })) {
            $log.debug('bookmark already exists');
            $ionicPopup.show({
              'template': '<p>Hotel is saved!</p>',
              'title': 'Bookmark',
              buttons: [
                { text: 'Ok' }
              ]
            })
            return false;
          }
        }
        $log.debug('adding new bookmark item');
        $localStorage.bookmarks.push(this.hotel);
        this.savedHotels.push(this.hotel.place_id);
        $ionicPopup.show({
          'template': '<p>Hotel is saved!</p>',
          'title': 'Bookmark',
          buttons: [
            { text: 'Ok' }
          ]
        });
      }, 300);

      this.shareHotel = function(){
         $cordovaSocialSharing
          .share(this.hotel.name, 'Sharing the hotel I like', null, this.hotel.website)
          .then(function(result) {
            // Success!
            $log.debug('Opened social share');
            $log.debug(result);
          }, function(err) {
            $ionicPopup.show({
              'template': err,
              'title': 'Social Sharing Error',
              buttons: [
                { text: 'Ok' }
              ]
            });
          });
      };
  }]);