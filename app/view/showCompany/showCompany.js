'use strict';

angular.module('csrLookupApp.showCompany', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showCompany/:id', {
    templateUrl: 'view/showCompany/showCompany.html',
    controller: 'ShowCompanyCtrl'
  });
}])

// Lucas' note to self: read about require.js
.controller('ShowCompanyCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
  $scope.id = $routeParams.id;

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/' + $routeParams.id
  }).then(function successCallback(response) {
    $scope.company = response.data;
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/' + $routeParams.id + '/evidence_records'
  }).then(function successCallback(response) {
    $scope.evidence_records = response.data;
  }, function errorCallback(response) {
    $scope.evidence_records = null
  });
}]);
