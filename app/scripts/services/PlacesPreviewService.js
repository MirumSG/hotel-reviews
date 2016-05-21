/**
 * Created by rihdus on 21/5/16.
 */

angular.module('HotelReview')
    .service('PlacePreviewService', [
        'Modal', '$rootScope', 'ApiService',
        function (Modal, $rootScope, ApiService) {
            "use strict";
            ModalController.$inject = ['$modalService', 'scope', 'locals'];
            function ModalController($modalService, scope, locals) {

                var place = locals.place,
                    mapName = locals.mapName,
                    placesService = null
                    ;

                /**
                 * Modal actions
                 * */
                scope.action = {
                    close: function () {
                        var modalInstance = $modalService.getModalInstance();
                        modalInstance.hide();
                    },
                    expandReviewList: function () {
                        scope.state.reviewList_expanded = true;
                    }
                };

                _init();
                _loadView();

                function _init() {
                    "use strict";
                    angular.extend(scope, {
                        place: place,
                        activity: {
                            loading: false
                        },
                        state: {
                            reviewList_expanded: false
                        }
                    });
                    /**
                     * Place Model
                     * */
                    scope.place = locals.place;
                }


                /**
                 * Run Modal workflow
                 * */
                function _loadView() {
                    "use strict";
                    scope.activity.loading = true;
                    ApiService.findPlaceDetails(mapName, place.place_id)
                        .then(function (placeDetails) {
                            scope.placeDetails = placeDetails;
                            console.log(scope.placeDetails);
                        })
                        .catch(function (err) {
                            scope.activity.error = err;
                        })
                        .finally(function () {
                            scope.activity.loading = false;
                        })
                }
            }

            this.showPreview = function (mapName, place) {
                "use strict";
                Modal.show({
                    options: {
                        controller: ModalController,
                        scope: $rootScope.$new(),
                        locals: {
                            mapName: mapName,
                            place: place
                        }
                    },
                    templateUrl: 'templates/partial/place-preview.modal.tpl.html'
                })
            };

        }
    ]);