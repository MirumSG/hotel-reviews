/**
 * Created by rihdus on 21/5/16.
 */

angular.module('HotelReview')
    .directive('searchBar', [
        function () {
            "use strict";
            //formatter:off
            var inputSearchBar =
                '<div class="bar bar-header item-input-inset"' +
                    'style="padding-left: 0px">' +
                    '<label class="item-input-wrapper">' +
                        '<i class="icon ion-ios-search placeholder-icon"></i>' +
                        '<input type="search" placeholder="Search">' +
                    '</label>'
                '</div>';
            //formatter:on

            return {
                template: inputSearchBar
            }
        }
    ]);