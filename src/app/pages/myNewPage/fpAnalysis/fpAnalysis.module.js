(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myNewPage.fpAnalysis', ['ui.toggle'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('myNewPage.fpAnalysis', {
          url: '/fpAnalysis',
          controller: 'FpAnalysisCtrl',
          templateUrl: 'app/pages/myNewPage/fpAnalysis/fpAnalysis.html',
          title: 'FP Analysis',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})()