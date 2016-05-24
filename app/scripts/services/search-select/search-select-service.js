/**
 * Created by rihdus on 7/12/15.
 */

;
(function () {
  "use strict";

  angular.module('search-select')
    .provider('SearchSelect', [
      function () {

        var defaultConfig = {
          templateUrl: 'templates/partial/search-select.modal.html',
          queryFn: function (query) {
            return []
          }
        };

        return {
          $get: ['$rootScope', '$injector', '$q', '$timeout', '$ionicModal',
            function ($rootScope, $injector, $q, $timeout, $ionicModal) {


              /**
               *
               * SearchSelector factory. Search and then select an item.
               *
               * @param {Object} config
               * @constructor
               *
               * @example
               *
               * var personSelector = new SearchSelect.SearchSelector({
							 *  queryFn: function(queryString) {...}
							 * })
               */
              function SearchSelector(config) {
                var self = this;
                self.config = angular.extend({}, angular.copy(defaultConfig), config);
                var parentScope = self.config.scope || $rootScope
                  , queryFn = self.config.queryFn || angular.noop;
                self.subject = null;
                self.scope = parentScope.$new();
                self.modalCtrl = null;
                self.state = {};
                var modalService = {
                    hide: function () {
                      self.modalCtrl &&
                      self.modalCtrl.hide();
                      //self.subject.onCompleted();
                    },
                    select: function (res) {
                      self.subject.onNext(res);
                      self.subject.onCompleted();
                      self.modalCtrl.hide();
                    }
                  }
                  ;

                $injector.invoke(['$scope', '$q', 'modalService',
                  function ($scope, $q, modalService) {
                    $scope.title = "Search select";
                    $scope.cancel = modalService.hide;
                    $scope.select = modalService.select;
                    $scope.queryStringModel = "";
                    $scope.queryResults = ["No results.."];

                    $scope.onQueryStringChange = function (newQueryString) {
                      var queryString = newQueryString;
                      $q.when(queryFn(queryString))
                        .then(function (res) {
                          $scope.queryResults = res;
                          $scope.resultSet = 'query';
                        })
                        .catch(function (err) {
                        })
                      ;
                    };

                    $scope.getResultSet = function () {
                      switch ($scope.resultSet) {
                        case 'query':
                          return $scope.queryResults;
                        default:
                          return $scope.defaultResults;
                      }
                    }

                  }], this, {
                  $scope: this.scope,
                  modalService: modalService
                });

                self.scope.$on('modal.shown', function () {
                  self.state = "isShown";
                  //console.log('modal.shown');
                });

                self.scope.$on('modal.hidden', function () {
                  self.state = "isHiding";
                  //console.log('disposing subject');
                  self.subject && self.subject.onCompleted();
                  self.subject && self.subject.dispose();
                  self.state = "isHidden";
                });

              }

              SearchSelector.prototype.showSearchSelector = function (queryString) {
                var self = this
                  ;

                if (self.state == 'isShowing') {
                  return;
                }

                self.state = "isShowing";
                //console.log('new subject');
                self.subject = new Rx.ReplaySubject(1);

                $ionicModal.fromTemplateUrl(self.config.templateUrl, {
                  scope: self.scope
                })
                  .then(function (modal) {
                    self.modalCtrl = modal;
                    self.scope.queryStringModel = (typeof queryString == 'undefined'
                      ? "" : queryString );
                    self.modalCtrl.show();
                  })
                  .catch(function (err) {
                    self.subject.onError(err);
                    console.log('disposing subject on error');
                    self.subject.dispose();
                  });

                return self;
              };
              SearchSelector.prototype.setResults = function setResults(results) {
                this.scope.defaultResults = results;
                this.scope.resultSet = 'default';
              };

              var FullScreenSelector = (function () {
                return {}
              })();

              /**
               *
               * @callback queryFnCallback Query function, returns a promise object
               *         which takes a query string argument and resolves the query result
               *
               * @param {queryFnCallback} queryFn
               * @return {SearchSelector}
               */
              /*
               TODO: configurable placeholder text
               TODO: auto-focus input field option field.
               */
              FullScreenSelector.create = function (queryFn) {
                return new SearchSelector({
                  queryFn: queryFn
                });
              };

              return {
                FullScreenSelector: FullScreenSelector
              }

            }]
        };

      }
    ])

})();