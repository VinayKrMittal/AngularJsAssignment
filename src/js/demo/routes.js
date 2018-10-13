angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
  $stateProvider
  .state('app.components', {
    url: "/components",
    abstract: true,
    template: '<ui-view></ui-view>',
    ncyBreadcrumb: {
      label: 'Components'
    }
  })
   .state('app.components.cards', {
    url: '/cards',
    templateUrl: 'views/components/cards.html',
    ncyBreadcrumb: {
      label: 'Cards'
    }
  })

}]);
