'use strict';

angular.module('csrLookupApp.showCompany', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showCompany/:id', {
    templateUrl: 'view/showCompany/showCompany.html',
    // template: '<p>This is the partial for showing company {{$routeParams.id}}.</p>',
    controller: 'ShowCompanyCtrl'
  });
}])

// Read about require.js
.controller('ShowCompanyCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
  $scope.id = $routeParams.id;

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/' + $routeParams.id
  }).then(function successCallback(response) {
    $scope.company = response.data;
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    $scope.company = null
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/' + $routeParams.id + '/evidence_records'
  }).then(function successCallback(response) {
    $scope.evidence_records = response.data;
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    $scope.evidence_records = null
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}]);