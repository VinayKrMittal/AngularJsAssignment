// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ui.router.state.events'

])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])
.run(['$rootScope', '$state', '$stateParams','$window', function($rootScope, $state, $stateParams,$window) {
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
   // redirect to login page when authentication required
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
              console.log('inside changerote');
              var sessionKey = $window.sessionStorage.getItem('UserId');
              if(toState.authenticate && (!sessionKey))
              {
                      $state.transitionTo("appSimple.login");
                      event.preventDefault();
              }

      });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);


