(function () {
	'use strict';
	angular.module('BlurAdmin.pages.myNewPage.brahmastra')
	.controller('BrahmastraCtrl', BrahmastraCtrl);

	function BrahmastraCtrl($scope, $filter, $http, $location, $element, brahmastraFactory, editableOptions, editableThemes, baConfig, layoutPaths) {
		
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


// ###############################################################



$scope.myjson = {
  "Calltype                      ": "1,",
  "Total_Hits ": 11,
  "Website_Cached": "No",
  "Session_Status": "Not getting set and its Empty",
  "Total Number unique ": 0,
  "Total Number known whitelisted ": 0,
  "PID": "PID is unique for each and every request",
  "Total_Hits from Headless Browser": 41,
  "Total Number delta urls triggered": 17,
  "Scroll_checker": "Something went wrong",
  "Cookie_Status": ["http://localhost:3000/#/myNewPage/brahmastra","http://localhost:3000/#/myNewPage/brahmastra","http://localhost:3000/#/myNewPage/brahmastra","http://localhost:3000/#/myNewPage/brahmastra","http://localhost:3000/#/myNewPage/brahmastra"],
  "Non_Integrated_Urls": 72,
  "Total Number distinct URLs": 4,
  "Mode": "Monitor",
  "HB_Cookie_Status": "HB's Cookies(uzma's) % is -->2.44",
  "IP_Type": "Proper IPAddress",
  "Total_Hits reached BQ": 0,
  "PID_Format": "PID format are matching",
  "d_uzmc status": "d_uzmc are changing and % is -->80.487804878"
}

$scope.oneAtATime = true;

  $scope.groups = [
    {
      title: "Dynamic Group Header - 1",
      content: "Dynamic Group Body - 1"
    },
    {
      title: "Dynamic Group Header - 2",
      content: "Dynamic Group Body - 2"
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };
  
    $scope.pro = [
      {
        a : "G",
        b : "123",
        c : "S1",
        d : "D6",
        e : "O1",
        f : "B"
      },
         {
        a : "R",
        b : "456",
        c : "S2",
        d : "D5",
        e : "O2",
        f : "B"
      },
         {
        a : "G",
        b : "789",
        c : "S3",
        d : "D4",
        e : "O3",
        f : "P"
         },
    ];
    $scope.orderProp="d";

// #################################################################################









	}
})()
