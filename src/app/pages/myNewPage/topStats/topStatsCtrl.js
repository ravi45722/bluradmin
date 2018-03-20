(function () {
	'use strict';
	angular.module('BlurAdmin.pages.myNewPage.topStats')
	.controller('TopStatsCtrl', TopStatsCtrl);

	function TopStatsCtrl ($scope, $filter, $http, $location, $element, topStatsFactory) {
		$scope.newPage = "From the controller";
		$scope.show_ui_tab_div = false
		$scope.show_ua_stats = false
		$scope.show_url_stats = false
		$scope.requesting_backend = false

		$scope.submit = function(Obj) {
			//alert("From the controller");
			$scope.show_ui_tab_div = true
			$scope.formObj = Obj;
			$scope.requesting_backend = true
			topStatsFactory.uastats({sid:Obj.sid, from:Obj.from, to:Obj.to})
			.then(function(response){
				$scope.requesting_backend = false
				$scope.show_ua_stats = true
				$scope.topuadata = response.data.data
				$scope.topuadata1 = response.data.data

			})
		}

		$scope.getTopSecStats = function() {
			var Obj = $scope.formObj;
			$scope.requesting_backend = true;
			topStatsFactory.sectionstats({sid:Obj.sid, from:Obj.from, to:Obj.to})
			.then(function(response){
				$scope.requesting_backend = false
				$scope.topurldata = response.data.data
				$scope.topurldata1 = response.data.data
			})
		}
	}

})()