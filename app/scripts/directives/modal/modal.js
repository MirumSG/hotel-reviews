/**
 * Created by sudhir on 12/2/16.
 */

;(function () {
	"use strict";

	var MODAL_EVENT = {
		READY: "READY",
		SHOW: "SHOW",
		EVENT: "EVENT"
	};

	function ModalService($q, $timeout, $controller, $ionicModal) {

		function defaultModalController($modalService, scope, locals) {
			angular.extend(scope, locals || {}, {
				modal: {
					hide: function () {
						return $modalService.getModalInstance().hide();
					}
				}
			});
			console.log(scope);
		}

		defaultModalController.$inject = [
			'$modalService', 'scope', 'locals'
		];

		function IonicModalConfig(templateUrl, modalInitializeOptions) {
			var _modalInitializeOptions = modalInitializeOptions || {};
			this.options = modalInitializeOptions;
			this.templateUrl = templateUrl;
			if (!_modalInitializeOptions.parentScope) {
				throw new Error("'scope' not found. Please provide the view scope object in the config object")
			} else {
				this.options.scope = _modalInitializeOptions.parentScope.$new();
			}
		}

		/**
		 *
		 * - options.scope
		 *
		 * - options.locals
		 *
		 * - options.controller
		 *
		 * - templateUrl
		 *
		 * */
		function show(modalConfig) {
			var modalInstance = null
				, deferred = $q.defer();

			$controller(modalConfig.options.controller || defaultModalController, {
				$modalService: {
					MODAL_EVENT: MODAL_EVENT,
					getModalInstance: function () {
						return modalInstance;
					},
					deferred: deferred
				},
				scope: modalConfig.options.scope,
				locals: modalConfig.options.locals
			});

			$ionicModal.fromTemplateUrl(modalConfig.templateUrl, modalConfig.options)
				.then(function (modal) {
					deferred.promise.modal = modalInstance = modal;
					deferred.notify({event: MODAL_EVENT.READY, modal: modal});
					modalInstance.show();
				});
			modalConfig.options.parentScope && modalConfig.options.parentScope.$on('$destroy', function () {
				try {
					modalInstance.remove();
				} catch (e) {
					console.log(e);
				}
			});
			modalConfig.options.scope.$on('modal.hidden', function () {
				$timeout(function () {
					modalInstance.remove();
				}, 200);
			});
			return deferred.promise;
		}

		return {
			MODAL_EVENT: MODAL_EVENT,
			ModalConfig: IonicModalConfig,
			show: show
		};
	}

	ModalService.$inject = ['$q', '$timeout', '$controller', '$ionicModal'];

	function ContentKeyboardResizeDirective() {
		return {
			link: function (scope, elem, attrs) {
				if (ionic.Platform.isIOS()) {
				}
			}
		}
	}

	ContentKeyboardResizeDirective.$inject = [];

	angular.module('app.component.modal', ['ionic'])
		.service('Modal', ModalService)
		.directive('modal-content-keyboard-resize', ContentKeyboardResizeDirective)
	;

})();