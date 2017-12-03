'use strict';

angular.module('csrLookupApp.addEvidenceRecord', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showCompany/:companyId/addEvidenceRecord', {
    templateUrl: 'view/addEvidenceRecord/addEvidenceRecord.html',
    controller: 'AddEvidenceRecordCtrl'
  });
}])

.controller('AddEvidenceRecordCtrl', ['$http', '$scope', '$location', '$routeParams', function($http, $scope, $location, $routeParams) {
  $scope.companyId = $routeParams.companyId;

  $http({
    method: 'GET',
    url: 'http://localhost:3000/companies/' + $routeParams.companyId
  }).then(function successCallback(response) {
    $scope.company = response.data;
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });
}]);
