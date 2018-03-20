(function () {
	'use strict';

	angular.module('BlurAdmin.pages.myNewPage', [
		'BlurAdmin.pages.myNewPage.fpAnalysis',
		'BlurAdmin.pages.myNewPage.ipAnalysis',
		'BlurAdmin.pages.myNewPage.topStats'

	])
	.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
		$stateProvider
		.state('myNewPage', {
          url: '/myNewPage',
          abstract: true,
          template: '<div ui-view  autoscroll="true" autoscroll-body-top></div>',
          title: 'My New Page',
          sidebarMeta: {
            icon: 'ion-stats-bars',
            order: 150,
          },
        });
	}

})();
