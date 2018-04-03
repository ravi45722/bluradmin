(function () {
  'use strict';

  angular.module('BlurAdmin.pages.loginAuth',[])
      .config(routeConfig)
      
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('auth', {
          url: '/auth',
          controller: 'loginAuthCtrl',
          templateUrl: 'app/pages/auth/auth.html',
          /*title: 'Sphinx',
          sidebarMeta: {
            order: 0,
            icon: 'ion-compose',
          },*/
        });
  }

})()