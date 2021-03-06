'use strict';

angular.module('csrLookupApp.addCompany', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addCompany', {
    templateUrl: 'view/addCompany/addCompany.html',
    controller: 'AddCompanyCtrl'
  });
}])

.controller('AddCompanyCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $scope.on_add_company_button_click = function() {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/companies',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        name: $scope.company.name,
        wikipedia_name: $scope.company.wikipedia_name,
        industry: $scope.company.industry
      }
    }).then(function successCallback(response) {
      var persisted_company = response.data;
      $location.path('showCompany/' + persisted_company.id);
      // TODO: display a success message
    }, function errorCallback(response) {
      // TODO: figure out how to raise a 404 in this case
    });
  }
}]);
