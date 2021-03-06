(function() {
	'use strict';

	angular.module('BlurAdmin.pages')
	.factory('topStatsFactory', function ($http, $q, $window, $timeout){
		console.log("Factory loaded");

		return {
			uastats: function(data) {
				var deferred = $q.defer();
				setTimeout(function() {
					$http({
						method: 'POST',
						url: 'http://104.197.216.247:8000/topstats/topuastats',
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

			sectionstats: function (data){
				var deferred = $q.defer();
				setTimeout(function() {
					$http({
						method: 'POST',
						url: 'http://104.197.216.247:8000/topstats/topsecstats',
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
			}
		}
	})
})()