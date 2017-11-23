'use strict';

angular.module('csrLookupApp.addCompany', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addCompany', {
    templateUrl: 'view/addCompany/addCompany.html',
    controller: 'AddCompanyCtrl'
  });
}])

.controller('AddCompanyCtrl', [function() {

}]);