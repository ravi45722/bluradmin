(function () {
	'use strict';
	angular.module('BlurAdmin.pages.myNewPage.fpAnalysis')
	.controller('FpAnalysisCtrl', FpAnalysisCtrl);

	function FpAnalysisCtrl($scope, $filter, $http, $location, $element, fpAnalysisFactory, editableOptions, editableThemes, baConfig, layoutPaths) {

		var myObj = {}
		$scope.showSidTable = false;
		$scope.smartTablePageSize = 8;
		$scope.formObject = {}
		$scope.formObject['from'] = moment().subtract(7,'d').format('YYYY-MM-DD'); //"2018-03-13"
		$scope.formObject['to'] = moment().format('YYYY-MM-DD');

		//$scope.smartTablePageSize = 10;

		$scope.smartTableData = [];
		$scope.ruleTableData = [];

		$scope.select= function(index) {
			console.log("Index is :"+index)
			$scope.selected = index; 
		};

		//$scope.dateFrom = 
		$scope.submit = function(Obj) {
			$scope.formObj = Obj;
			fpAnalysisFactory.sidstats({from: Obj.from,	to: Obj.to,})
			.then(function(response){
				console.log("Got Response Successfully");
				console.log(response.data);
				$scope.showSidTable = true;
				$scope.smartTableData1 = response.data.data
				$scope.select(0)
				$scope.datewiseSidStats(response.data.data[0])
			})
		}

		$scope.submit($scope.formObject)

		$scope.datewiseSidStats = function(Obj) {
			fpAnalysisFactory.datewiseSidStats({from: $scope.formObj.from, to: $scope.formObj.to, sid: Obj.SID,})
			.then(function(response){
				console.log("Response for datewiseSidStats");
				console.log(response.data);
				$scope.sidChartdata = response.data.data
				
				$scope.ruleTableData = []
				$scope.ruleTableData = response.data.columns
				$scope.ruleTableData1 = [].concat(response.data.columns);
				//$scope.ruleTableData1 = response.data.columns
				//$scope.legendData = response.data.columns
				var layoutColors = baConfig.colors;
				$scope.graphs = []
				for(var i=0; i<1; i++) {
					/*var Obj = {
						"id": "g"+(i+1).toString(),
						"bullet": "round",
						"bulletAlpha": 0.3,
						"lineAlpha": 0.3,
						"lineThickness": 1,
						"title": "All",
						"type": "smoothedLine",
						"color": "#EE4248",
						"valueField": "All",
						"labelText": "[[value]]",
						lineColor: layoutColors.danger,
					};*/ 
					var Obj = {
						id: "g"+(i+1).toString(),
						balloonText: 'All [[value]]',
						bullet: 'round',
						bulletSize: 8,
						lineColor: layoutColors.danger,
						lineThickness: 1,
						negativeLineColor: layoutColors.warning,
						type: 'smoothedLine',
						valueField: 'All'
					}
					$scope.graphs.push(Obj)
				}
				console.log($scope.graphs)
				showchart({"data":$scope.sidChartdata,"graphs":$scope.graphs})
			})
		}
		
		/* chart */
		function handleLegendClick( graph ) {
			var chart = graph.chart;
			for( var i = 0; i < chart.graphs.length; i++ ) {
				if ( graph.id == chart.graphs[i].id )
					chart.showGraph(chart.graphs[i]);
				else
					chart.hideGraph(chart.graphs[i]);
			}
			// return false so that default action is canceled
			return false;
		}
		
		$scope.ruleTableHandler = function ruleTableHandler(Obj) {
			console.log($scope.sidChartdata)
			console.log(Obj)
			$scope.graphs = []
			var layoutColors = baConfig.colors;
			var Obj = {
				id: "g1",
				balloonText: Obj.rule+' [[value]]',
				bullet: 'round',
				bulletSize: 8,
				lineColor: layoutColors.danger,
				lineThickness: 1,
				negativeLineColor: layoutColors.warning,
				type: 'smoothedLine',
				valueField: Obj.rule

				/*"id": "g1",
				"bullet": "round",
				"bulletAlpha": 0.3,
				"lineAlpha": 0.3,
				"lineThickness": 1,
				"title": Obj.rule,
				"type": "smoothedLine",
				"color": "#000000",
				"valueField": Obj.rule,
				"labelText": "[[value]]",
				"lineColor": "#EE4248",*/
			}; 
			$scope.graphs.push(Obj)
			showchart({"data":$scope.sidChartdata,"graphs":$scope.graphs})
		}
		
		function showchart(dataObj){
			var layoutColors = baConfig.colors;
			var chart = AmCharts.makeChart("chartdiv", {
				type: 'serial',
				theme: 'blur',
				color: layoutColors.defaultText,
				marginTop: 0,
				marginRight: 15,
				dataProvider: dataObj.data,
				valueAxes: [
				{
					axisAlpha: 0,
					position: 'left',
					gridAlpha: 0.5,
					gridColor: layoutColors.border,
				}
				],
				
				/*"legend": {
					"horizontalGap": 10,
					"maxColumns": 1,
					"position": "right",
					"useGraphSettings": true,
					"markerSize": 10,
					"clickMarker": handleLegendClick,
					"clickLabel": handleLegendClick,
					"listeners": [{
						"event": "rollOverItem",
						"method": function(event) {
							setOpacity(event.chart.graphs[event.dataItem.index], 1);
						}
					}, {
						"event": "rollOutItem",
						"method": function(event) {
							setOpacity(event.chart.graphs[event.dataItem.index], 0.5);
						}
					}]
				},*/
				
				"graphs": dataObj.graphs,
				"categoryField": "dt",
				"categoryAxis": {
					"minPeriod": "DD",
					"parseDates": true,
					"minorGridAlpha": 0.1,
					"minorGridEnabled": true,
					"gridPosition": "start",
				},
				chartCursor: {
					categoryBalloonDateFormat: 'YYYY MMM DD',
					cursorAlpha: 0,
					valueLineEnabled: true,
					valueLineBalloonEnabled: true,
					valueLineAlpha: 0.5,
					fullWidth: true
				},
				
				/*"categoryAxis": {
					"gridAlpha": 0.1,
					"position": "left"
				}*/

			});

/**
 * Define functions that set opacity of the line graphs
 */
 chart.timeout;
 for( var i = 0; i < chart.graphs.length; i++ ) {
 	if ( i==0 )
 		chart.showGraph(chart.graphs[i]);
 	else
 		chart.hideGraph(chart.graphs[i]);
 }

/* function setOpacity(graph, opacity) {
	var className = "amcharts-graph-" + graph.id;
	var items = document.getElementsByClassName(className);
	if (undefined === items)
		return;
	for (var x in items) {
		if ("object" !== typeof items[x])
			continue;
		var path = items[x].getElementsByTagName("path")[0];
		if (undefined !== path) {
	  // set line opacity
	  path.style.strokeOpacity = opacity;
  }

	// set bullet opacity
	var bullets = items[x].getElementsByClassName("amcharts-graph-bullet");
	for (var y in bullets) {
		if ("object" !== typeof bullets[y])
			continue;
		bullets[y].style.fillOpacity = opacity;
	}

	// set label opacity
	var labels = items[x].getElementsByClassName("amcharts-graph-label");
	for (var y in labels) {
		if ("object" !== typeof labels[y])
			continue;
		labels[y].style.opacity = opacity == 1 ? 1 : 0;
	}

}
}*/
}



/* chart */


/*		$scope.submit = function(Obj) {
			$scope.formObj = Obj;
			myObj = Obj;
			console.log(Obj)
			$scope.requesting_backend = true
			$http({
				method: 'POST',
				url: 'http://104.197.216.247:8000/fpanalysis/sidstats',
				headers: {
					accept: 'application/json'
				},
				data: {
					from: Obj.from,
					to: Obj.to,
				}
			}).then(function successCallback(response) {
				if(response.status== 200){
					$scope.requesting_backend = false
					$scope.show_ip_stats = true;
					console.log("Got Response Successfully");
					console.log(response.data);
					$scope.smartTableData1 = response.data.data
					$scope.select(0)
					$scope.get_rules_for_sid(response.data.data[0])
				}
			})

		}*/

		/*$scope.get_rules_for_sid = function(Obj) {
			$http({
				method: 'POST',
				url: 'http://104.197.216.247:8000/fpanalysis/rulestats',
				headers: {
					accept: 'application/json'
				},
				data: {
					from: $scope.formObj.from,
					to: $scope.formObj.to,
					sid: Obj.SID,
				}
			}).then(function successCallback(response) {
				if(response.status== 200){
					$scope.requesting_backend = false
					$scope.show_ip_stats = true;
					console.log("Got Response Successfully");
					console.log(response.data);
					$scope.ruleTableData = [].concat(response.data.data)
					$scope.ruleTableData1 = [].concat(response.data.data)
				}
			})
		}*/
	}
})()