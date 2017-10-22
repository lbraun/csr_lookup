'use strict';

// Declare app level module which depends on views, and components
angular.module('csrLookupApp', [
  'ngRoute',
  'csrLookupApp.mainPage',
  'csrLookupApp.addCompany',
  'csrLookupApp.advancedSearch',
  'csrLookupApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/mainPage'});
}]);
