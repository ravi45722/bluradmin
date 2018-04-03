(function() {
	'use strict';

	angular.module('BlurAdmin.pages')
	.factory('authFactory', function ($http, $q, $window, $timeout){
		console.log("Auth Factory loaded");
			return {
				authenticate: function(data) {
					var deferred = $q.defer();
					setTimeout(function() {
						$http({
							method: 'POST',
							url: 'http://104.197.216.247:8000/loginAuth/authenticate',
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