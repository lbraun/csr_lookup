'use strict';

angular.module('csrLookupApp.advancedSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/advancedSearch', {
    templateUrl: 'advancedSearch/advancedSearch.html',
    controller: 'AdvancedSearchCtrl'
  });
}])

.controller('AdvancedSearchCtrl', [function() {

}]);