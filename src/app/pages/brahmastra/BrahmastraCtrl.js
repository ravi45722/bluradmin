(function () {
	'use strict';
	angular.module('BlurAdmin.pages.brahmastra')
	.controller('BrahmastraCtrl', BrahmastraCtrl);



	function BrahmastraCtrl($scope, $filter, $http, $uibModal, $location, $rootScope, $element, brahmastraFactory, editableOptions, editableThemes, baConfig, layoutPaths) {
		
		$scope.show_new_job = false;
		$scope.smartTablePageSize = 10;

		$scope.addJob = function () {
			$scope.show_new_job = true;
		}

		$scope.selectedRow = null;  // initialize our variable to null
		$scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
			$scope.selectedRow = index;
		}

		$scope.submit = function (formObj) {
			brahmastraFactory.initiateJob({"start_url":formObj.starturl,"domain":formObj.domain,"sid":formObj.sid})
			.then(function(response){
				console.log(response)
			})
		}

		$scope.getAllJobStatus = function () {
			brahmastraFactory.getJobsData({})
			.then(function(response){
				console.log(response.data.data)
				$scope.jobsdata = response.data.data;
				$scope.jobsdata1 = response.data.data;
			})
		}

		$scope.getAllJobStatus()


		$scope.openModalToShowUrls = function(row, page, size) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: page,
				controller: urlModalCtrl,
				size: size,
				resolve: {
					pop_data: function () {
						return  {"type":row.key, "id":row.id};
					}
				}
			});
		}
		
		$scope.getUrlDetails = function(row) {
			console.log("Calling the URL function")
			$scope.openModalToShowUrls(row, "app/pages/brahmastra/modals/urlModals.html","md")
		}

		$scope.getJobDetails = function (row) {
			console.log(row)
			brahmastraFactory.getJobDetails({"id":"489233d7-754f-497e-bd18-e824789ccbd6"})
			.then(function(response){
				console.log(response.data)
				$scope.myjson = JSON.parse(response.data)

				/*var long_key = "";
				var long_key_length = 0;
				angular.forEach($scope.myjson, function(value, key){
					//console.log(key)
					if(key.length > long_key_length) {
						long_key = key
						long_key_length = key.length
					}
				})
				console.log(long_key_length)
				console.log(long_key)

				var final_string = ""*/
				var arr = []
				angular.forEach($scope.myjson, function (value, key){
					/*var spaced_key = key+Array(long_key_length - key.length).join("&nbsp")
					console.log(spaced_key)
					final_string = final_string + "<p> <b>"+spaced_key + "</b> : "+ value + "</p>"*/
					arr.push({"key":key,"value":value,"id":"1221iugggy-87667-jhjbvh-7667"})
				})
				
				// document.getElementById('jsontext').value = final_string
				
				$scope.table_content = arr
			})
		}



		$scope.myjson = {
			"Calltype": "1,",
			"Total_Hits": 11,
			"Website_Cached": "No",
			"Session Status": "Not getting set and its Empty",
			"Total Numb": 0,
			"PID is sam": "PID is unique for each and every request",
			"Total Hits": 41,
			"Total Numd": 17,
			"Scroll_chr": "Something went wrong",
			"Cookie_Sts": "Hits made", 
			"Non_Integs": 72,
			"Total Nums": 4,
			"Mode is sa": "Monitor",
			"HB_Cookies": "HB's Cookies(uzma's) % is -->2.44",
			"IP_Type is": "Proper IPAddress",
			"PID_Format": "PID format are matching",
			"d_uzmc sts": "d_uzmc are changing and % is -->80.487804878"
		}
	};



	angular.module('BlurAdmin.pages.myNewPage.brahmastra')
	.controller('urlModalCtrl', urlModalCtrl);

	function urlModalCtrl($scope, $window, $uibModalInstance, pop_data, brahmastraFactory) {
		var urlObj = {
			"URLS not integrated with SS": "Non_Integrated"
		}

		$scope.vari = "from controller"

		console.log()

		$scope.getReqTypeUrl = function(pop_data){
			brahmastraFactory.getUrlDetails({"type":urlObj[pop_data.type],"id":pop_data.id})
			.then(function(response){
				console.log(response)
				$scope.urllist = response.data.data
				$scope.urllist1 = response.data.data
			})
		}
		$scope.getReqTypeUrl(pop_data);
	}
})()
