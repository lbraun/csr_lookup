'use strict';

angular.module('csrLookupApp.searchResults', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/searchResults', {
    templateUrl: 'view/searchResults/searchResults.html',
    controller: 'SearchResultsCtrl'
  });
}])

.controller('SearchResultsCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
  init();
  function init() {
    var userId = 1;
    var searchWord = $location.search().search_word;
    if(searchWord) {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/companies/users/'+ userId +'/search/' + searchWord
      }).then(function successCallback(response) {
        $scope.searchResults = response.data;
        // This callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // Called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  }
}]);
