(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myNewPage.brahmastra',[])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('myNewPage.brahmastra', {
          url: '/brahmastra',
          controller: 'BrahmastraCtrl',
          templateUrl: 'app/pages/myNewPage/brahmastra/brahmastra.html',
          title: 'Sphinx',
          sidebarMeta: {
            order: 0,
          },
        });
  }

})()