'use strict';

angular.module('csrLookupApp.advancedSearch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/advancedSearch', {
    templateUrl: 'view/advancedSearch/advancedSearch.html',
    controller: 'AdvancedSearchCtrl'
  });
}])

.controller('AdvancedSearchCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {
     init();
     function init(){
         var searchWord = $location.search().search_word;
         if(searchWord)
         {
             $http({
              method: 'GET',
              url: 'http://localhost:3000/Companies/' + searchWord
            }).then(function successCallback(response) {
                $scope.searchResults = response.data;
                // this callback will be called asynchronously
                // when the response is available
              }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
            }
        }
}]);