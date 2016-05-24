/**
 * Created by rihdus on 6/12/15.
 */

;
(function () {
	"use strict";

	angular.module('search-select')
		.directive('searchSelect', [
			'$q', 'SearchSelect',
			function ($q, SearchSelect) {
				console.log('searchSelect');

				var ngRepeatRegex = /^\s*(.+)\s+in\s+(.+)/;

				return {
					require: ['ngModel'],
					restrict: 'A',
					compile: function ($elem, $attr) {
						var match = $attr.searchSelect.match(ngRepeatRegex)
							, ssModelString = $attr.ngModel
							, selectedItem = null
							;
						var ssItems = {
								indexModel: match[1],
								queryFn: match[2]
							}
							, queryStringModel
							;

						return {
							post: postLink
						};


						function postLink($scope, $elem, $attr, ctrls) {
							var ngModelCtrl = ctrls[0]
								, queryFn = $scope.$eval(ssItems.queryFn)
								, searchSelectScope = $scope.$new()
								, searchSelector = SearchSelect.FullScreenSelector.create(function (queryString) {
									var res = queryFn(queryString);
									return res;
								})
								, isShowing = false
								;

							searchSelectScope.ssModel = $scope.$eval(ssModelString);

							//$elem.on('focus', function (e) {
							//	//e.preventDefault();
							//	//e.stopPropagation();
							//	//console.log('newVal', newVal);
							//	var value = ngModelCtrl.$modelValue;
							//	if (!isShowing
							//		&& (searchSelector.state != 'isShown' || searchSelector.state !=
							//		'isShowing')) {
							//		isShowing = true;
							//		console.log(value);
							//		searchSelector.showSearchSelector(value);
							//		searchSelector.subject.subscribe(function (x) {
							//			isShowing = false;
							//			selectedItem = x;
							//			ngModelCtrl.$setViewValue(x);
							//			ngModelCtrl.$render();
							//		}, function (y) {
							//			isShowing = false;
							//			console.log(y);
							//		}, function () {
							//			isShowing = false;
							//		});
							//
							//	}
							//});

							$scope.$watch(ssModelString, function (newVal, oldVal) {
								console.log('newVal', newVal, selectedItem);
								if (newVal == selectedItem) return;
								var value = newVal;
								if (value
									&& !isShowing
									&& (searchSelector.state != 'isShown' || searchSelector.state !=
									'isShowing')) {
									isShowing = true;
									searchSelector.showSearchSelector(value).subject.subscribe(function (x) {
										selectedItem = x;
										ngModelCtrl.$setViewValue(x);
										ngModelCtrl.$render();
									}, function (y) {
										isShowing = false;
										console.log(y);
									}, function () {
										isShowing = false;
									});
								}
							});

							function runQuery(queryString) {
								return $scope.$eval(queryString);
							}

							function showSearchSelect() {

							}
						}

					}
				};

			}
		])

})();