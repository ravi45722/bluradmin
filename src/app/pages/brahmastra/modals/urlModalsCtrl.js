(function () {
	'use strict';
	angular.module('BlurAdmin.pages.myNewPage.brahmastra')
	.controller('urlModalCtrl', urlModalCtrl);

	function urlModalCtrl($scope, $filter, $http, $uibModal, $location, $element, brahmastraFactory, editableOptions, editableThemes, baConfig, layoutPaths) {
		$scope.vari = "from controller"
	}

})()