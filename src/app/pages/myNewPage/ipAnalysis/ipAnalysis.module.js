(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myNewPage.ipAnalysis', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('myNewPage.ipAnalysis', {
          url: '/ipAnalysis',
          controller: 'IpAnalysisCtrl',
          templateUrl: 'app/pages/myNewPage/ipAnalysis/ip-analysis.html',
          title: 'IP Analysis',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})()