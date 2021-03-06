'use strict';

// Declare app level module which depends on views, and components
angular.module('csrLookupApp', [
  'ngRoute',
  'csrLookupApp.mainPage',
  'csrLookupApp.addCompany',
  'csrLookupApp.showCompany',
  'csrLookupApp.addEvidenceRecord',
  'csrLookupApp.advancedSearch',
  'csrLookupApp.searchResults',
  'csrLookupApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/mainPage'});
}]);
