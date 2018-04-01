(function () {
  'use strict';

  angular.module('BlurAdmin.pages.myNewPage.brahmastra',['jsonFormatter', 'angularResizable'])
      .config(routeConfig)
      .config(function (JSONFormatterConfigProvider) {

  // Enable the hover preview feature
  JSONFormatterConfigProvider.hoverPreviewEnabled = false;
});

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