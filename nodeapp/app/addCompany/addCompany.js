'use strict';

angular.module('csrLookupApp.addCompany', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addCompany', {
    templateUrl: 'addCompany/addCompany.html',
    controller: 'AddCompanyCtrl'
  });
}])

.controller('AddCompanyCtrl', [function() {

}]);