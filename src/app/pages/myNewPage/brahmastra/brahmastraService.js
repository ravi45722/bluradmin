(function() {
	'use strict';

	angular.module('BlurAdmin.pages')
	.factory('brahmastraFactory', function ($http, $q, $window, $timeout){
		console.log("Initial Data analysis Factory loaded");
			return {
				initiateJob: function(data) {
					var deferred = $q.defer();
					setTimeout(function() {
						$http({
							method: 'POST',
							url: 'http://104.197.216.247:8000/initialdataanalysis/initiateJob',
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

				getJobsData: function(data) {
					var deferred = $q.defer();
					setTimeout(function() {
						$http({
							method: 'POST',
							url: 'http://104.197.216.247:8000/initialdataanalysis/getJobStatus',
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



			}
	})
})()