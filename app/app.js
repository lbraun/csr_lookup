'use strict';

// Declare app level module which depends on views, and components
var ngModule = angular.module('csrLookupApp', [
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

var development_env = {
  apiUrl: 'https://localhost:8080',
  baseUrl: '/'
};

var production_env = {
  apiUrl: 'https://csr-lookup.herokuapp.com',
  baseUrl: '/'
};

// Register environment in AngularJS as constant
ngModule.constant('__env', production_env);
// ngModule.constant('__env', development_env);
