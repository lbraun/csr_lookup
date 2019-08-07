'use strict';

angular.module('csrLookupApp.addEvidenceRecord', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/showCompany/:companyId/addEvidenceRecord', {
    templateUrl: 'view/addEvidenceRecord/addEvidenceRecord.html',
    controller: 'AddEvidenceRecordCtrl'
  });
}])

.controller('AddEvidenceRecordCtrl', ['$http', '$scope', '$location', '$routeParams', '__env', function($http, $scope, $location, $routeParams, __env) {
  $scope.companyId = $routeParams.companyId;

  $http({
    method: 'GET',
    url: __env.apiUrl + '/api/companies/' + $routeParams.companyId
  }).then(function successCallback(response) {
    $scope.company = response.data;
  }, function errorCallback(response) {
    // TODO: figure out how to raise a 404 in this case
  });

  $scope.on_add_evidence_record_button_click = function() {
    $http({
      method: 'POST',
      url: __env.apiUrl + '/api/companies/' + this.companyId + '/evidence_records',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        title: $scope.evidence_record.title,
        reference_url: $scope.evidence_record.reference_url,
        reference_title: $scope.evidence_record.reference_title,
        description: $scope.evidence_record.description,
        score: $scope.evidence_record.score
      }
    }).then(function successCallback(response) {
      $location.path('showCompany/' + $scope.company.id);
      // TODO: display a success message
    }, function errorCallback(response) {
      // TODO: figure out how to raise a 404 in this case
    });
  }
}]);
