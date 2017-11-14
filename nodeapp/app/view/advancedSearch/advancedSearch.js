'use strict';

angular.module('csrLookupApp.advancedSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/advancedSearch', {
    templateUrl: 'view/advancedSearch/advancedSearch.html',
    controller: 'AdvancedSearchCtrl'
  });
}])

.controller('AdvancedSearchCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
     
}]);