(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myNewPage.topStats', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('myNewPage.topStats', {
          url: '/topStats',
          controller: 'TopStatsCtrl',
          templateUrl: 'app/pages/myNewPage/topStats/topStats.html',
          title: 'Active Mode Upgrade',
          sidebarMeta: {
            order: 3,
          },
        });
  }

})()