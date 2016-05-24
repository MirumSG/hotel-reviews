/**
 * Created by sudhir on 10/2/16.
 */

;(function () {
	"use strict";

	function DialogService($q, $timeout, $rootScope,
	                       $controller, $ionicPopup) {

		defaultDialogController.$inject = ['$scope', 'locals', '$mdDialog'];

		var DialogService = {
			showAlert: showAlert,
			alert: showAlert,
			prompt: showPrompt,
			showConfirm: showConfirm,
			confirm: showConfirm,
			show: show,
			showSimple: showSimple,
			showSearchSelector: showSearchSelector
		};

		return DialogService;

		/**
		 *
		 * @param config
		 * - title: String
		 * - subTitle: String
		 * - scope:
		 * - templateUrl: String of the dialog body
		 * - controller: Injectable controller for the template
		 * - buttons: Array of dialog button objects with keys [text, type, onTap]
		 * - cssClass: Array of dialog button objects with keys [text, type, onTap]
		 * - locals: Objects to be passed in to the controller
		 * @returns {*|d.promise|promise}
		 */
		function show(config) {
			var _config = config || {};
			var popupParams = _.pick(_config, ['cssClass', 'title', 'subTitle', 'scope', 'template', 'templateUrl', 'buttons', 'buttons_left']);
			var deferred = $q.defer();
			var $mdDialog = {
				cancel: cancel,
				hide: hide
			};
			var popOverHandle = null;
			var controller = _config.controller || defaultDialogController;

			var parentScope = _config.scope || $rootScope;
			var scope = parentScope.$new();
			$controller(controller, angular.extend({},
				_config.locals,
				{
					locals: _config.locals,
					$scope: scope,
					$mdDialog: $mdDialog
				}
			));

			popOverHandle = $ionicPopup.show(
				angular.extend({scope: scope}, popupParams));
			popOverHandle.then(function (result) {
					deferred.resolve(result)
				}, null, function () {

				})
				.catch(function (err) {
					deferred.reject(err);
				})
			;

			deferred.promise.$dialog = $mdDialog;

			return deferred.promise;

			function cancel(reason) {
				popOverHandle.close(reason);
				deferred.resolve(reason);
			}

			function hide(result) {
				popOverHandle.close(result);
				deferred.resolve(result);
			}
		}

		function showPrompt() {
			return $ionicPopup.prompt.apply(this, arguments);
		}

		function showAlert() {
			var deferred = $q.defer();
			$ionicPopup.alert.apply(this, arguments)
				.then(function (res) {
					deferred.resolve(res);
				})
				.catch(function (err) {
					console.error('alert dialog open fail', err);
					deferred.reject(err);
				})
			;
			return deferred.promise;
		}

		function showConfirm() {
			var deferred = $q.defer();
			$ionicPopup.confirm.apply(this, arguments)
				.then(function (res) {
					if (res) {
						deferred.resolve(res);
					} else {
						deferred.reject();
					}
				})
				.catch(function (err) {
					console.error('confirm dialog open fail', err);
					deferred.reject(err);
				})
			;
			return deferred.promise;
		}

		function showSimple() {
		}

		function showSearchSelector() {
		}

		function defaultDialogController($scope, locals, $mdDialog) {
			angular.extend($scope, locals || {}, {
				$mdDialog: $mdDialog
			});
		}

	}

	DialogService.$inject = ['$q', '$timeout', '$rootScope',
		'$controller', '$ionicPopupMutation'];

	angular.module('app.component.dialog', ['ionic'])
		.service('Dialog', DialogService)

})();