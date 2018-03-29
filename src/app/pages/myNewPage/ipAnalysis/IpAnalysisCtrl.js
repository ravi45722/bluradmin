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
   function IpAnalysisCtrl($scope, $filter, $http, $window, $location, editableOptions, editableThemes) {

    $scope.formObject = {}
    $scope.show_reason_table = false;
    $scope.show_ip_stats = false;
    $scope.show_raw_stats = false;
    $scope.smartTablePageSize = 10;
    $scope.submit_requesting_backend = false


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
      $scope.submit_requesting_backend = true
      var ipaddress = formObject.ipaddress.split(",")
      $http({
        method: 'POST',
        url: 'http://104.197.216.247:8000/ipanalysis/blockreason',
        headers: {
          accept: 'application/json'
        },
        data: {
          sid: formObject.sid,
          ip_address: ipaddress
        }
      }).then(function successCallback(response) {
        if(response.status== 200){
          console.log("Got Response Successfully");
          console.log(response.data);
          $scope.submit_requesting_backend = false;
          $scope.show_reason_table = true;
          $scope.reason_data = response.data
        }
      })

    }

    $scope.download = function(Obj) {
      var newWindowRef = $window.open('http://104.197.216.247:8000/ipanalysis/download?ipaddress='+Obj.ip_address);
      if (newWindowRef) {

      } else {

      }
      /*$http.get('http://104.197.216.247:8000/ipanalysis/download', {
    headers: { Accept: "application/pdf"},  
    transformResponse: function(data) {
        return new Blob([data], {type: 'application/pdf'});
    }}).success(function (data) {
           var fileURL = URL.createObjectURL(data);
           window.open(fileURL);
    });*/
      /*$http({ method: 'GET', url: 'http://104.197.216.247:8000/ipanalysis/download',})
      .success(function(data, status, headers, config){
        var anchor = angular.element('<a/>');
        anchor.attr({
         href: 'data:attachment/csv;charset=utf-8,' + encodeURI(data),
         target: '_blank',
         download: 'filename.xlsx'
       })[0].click();
      var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    var objectUrl = URL.createObjectURL(blob);
    window.open(objectUrl);
      })
      .error(function(data, status, headers, config) {
        console.log("Error")
      });*/

    }



  }
})()

