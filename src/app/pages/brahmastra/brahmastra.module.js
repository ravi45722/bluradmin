(function () {
  'use strict';

  angular.module('BlurAdmin.pages.brahmastra',['jsonFormatter', 'angularResizable'])
      .config(routeConfig)
      .config(function (JSONFormatterConfigProvider) {

  // Enable the hover preview feature
  JSONFormatterConfigProvider.hoverPreviewEnabled = false;
});

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('brahmastra', {
          url: '/brahmastra',
          controller: 'BrahmastraCtrl',
          templateUrl: 'app/pages/brahmastra/brahmastra.html',
          title: 'Sphinx',
          sidebarMeta: {
            order: 0,
            icon: 'ion-compose',
          },
        });
  }

})()