/**
 * @author v.lugovsky
 * created on 16.12.2015
 */

(function () {
	'use strict';
console.log("kkk")

	angular.module('BlurAdmin.pages.myNewPage.ipAnalysis')
 		.controller('IpAnalysisCtrl', IpAnalysisCtrl);
 	/** @ngInject */
	function IpAnalysisCtrl($scope, $filter, $http, $location, editableOptions, editableThemes) {

		$scope.formObject = {}
    $scope.show_reason_table = false;
    $scope.show_ip_stats = false;
    $scope.show_raw_stats = false;
    $scope.smartTablePageSize = 10;


    $scope.get_detailed_stat_for_ip = function(Obj) {

      console.log(Obj)
      $scope.requesting_backend = true
      $http({
        method: 'POST',
        url: 'http://104.197.216.247:8000/ipanalysis/agg_stats',
        headers: {
                accept: 'application/json'
        },
        data: {
          sid: Obj.SID,
          ip_address: Obj.ip_address,
          "Date": Obj['Date']
        }
      }).then(function successCallback(response) {
          if(response.status== 200){
            $scope.requesting_backend = false
            $scope.show_ip_stats = true;
            console.log("Got Response Successfully");
            console.log(response.data);
            $scope.detailed_data = response.data
          }
        })
    }

    $scope.get_raw_packet = function(Obj) {
      console.log(Obj)
      $scope.requesting_backend = true
      $scope.show_ip_stats = false;
      $http({
        method: 'POST',
        url: 'http://104.197.216.247:8000/ipanalysis/raw_stats',
        headers: {
                accept: 'application/json'
        },
        data: {
          sid: Obj.SID,
          ip_address: Obj.ip_address,
          "Date": Obj['Date']
        }
      }).then(function successCallback(response) {

          if(response.status== 200){
            $scope.requesting_backend = false;
            $scope.show_raw_stats = true;
            console.log("Got Response Successfully");
            console.log(response.data);
            
            $scope.raw_data = response.data.data
            $scope.raw_data1 = response.data.data
          }
        })
    }

		$scope.submit = function(formObject) {
			$http({
        method: 'POST',
        url: 'http://104.197.216.247:8000/ipanalysis/blockreason',
        headers: {
                accept: 'application/json'
        },
        data: {
          sid: formObject.sid,
          ip_address: formObject.ipaddress
        }
      }).then(function successCallback(response) {
          if(response.status== 200){
            console.log("Got Response Successfully");
            console.log(response.data);
            $scope.show_reason_table = true;
            $scope.reason_data = response.data
          }
        })

		}
	}
})()

