(function() {
	'use strict';

	angular.module('BlurAdmin.pages')
	.factory('fpAnalysisFactory', function ($http, $q, $window, $timeout){
		console.log("Factory loaded");

		var sidChartData = []
		return {
			sidstats: function(data) {
				var deferred = $q.defer();
				setTimeout(function() {
					$http({
						method: 'POST',
						url: 'http://104.197.216.247:8000/fpanalysis/sidstats',
						//url: 'http://localhost:3010/fpanalysis/sidstats',
						headers: {
							accept: 'application/json'
						},
						data: data
					}).then(function(res) {
						deferred.resolve(res);
					}, function(err) {
						deferred.reject();

					});
				})
				return deferred.promise;
			},

			datewiseRuleStats: function(data){
				var deferred = $q.defer();
				setTimeout(function() {
					$http({
						method: 'POST',
						url: 'http://104.197.216.247:8000/fpanalysis/datewiseRuleStats',
						//url: 'http://localhost:3010/fpanalysis/rulestats',
						headers: {
							accept: 'application/json'
						},
						data: data
					}).then(function(res) {
						deferred.resolve(res);
					}, function(err) {
						deferred.reject();

					});
				})
				return deferred.promise;
			}, 

			datewiseSidStats: function(data){
				var deferred = $q.defer();
				setTimeout(function() {
					$http({
						method: 'POST',
						url: 'http://104.197.216.247:8000/fpanalysis/rulestats',
						//url: 'http://localhost:3010/fpanalysis/rulestats',
						headers: {
							accept: 'application/json'
						},
						data: data
					}).then(function(res) {
						/*var Obj = {}
						for(var i = 0; i < res.data.data.length; i++){
							console.log(res.data.data[i])
						}*/
						deferred.resolve(res);
					}, function(err) {
						deferred.reject();
					});
				})
				return deferred.promise;
			},

			getChartData: function(data) {
				return sidChartData
			}
		}
	})	

})()