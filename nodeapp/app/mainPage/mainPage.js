'use strict';

angular.module('csrLookupApp.mainPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mainPage', {
    templateUrl: 'mainPage/mainPage.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', [function() {

}]);