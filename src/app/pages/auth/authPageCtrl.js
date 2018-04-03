(function () {
	'use strict';
	angular.module('BlurAdmin.pages.loginAuth')
	.controller('loginAuthCtrl', loginAuthCtrl);

	function loginAuthCtrl ($scope, $filter, $http, $uibModal, $location, $rootScope, $element, $timeout) {

		$scope.submit = function () {
			console.log($scope.username);
			console.log($scope.password);

			/*$timeout(function(){
                $rootScope.$emit('authenticated');
            },1000)*/
            $rootScope.sessionActive = true;
            sessionStorage.setItem("password",$scope.password);
        }

    }
})()