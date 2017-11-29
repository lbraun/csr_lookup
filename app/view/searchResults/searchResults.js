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
  $scope.rating_mousemove = function(event){
    event.currentTarget.children[0].style.width = event.offsetX/event.currentTarget.offsetWidth * 100  + "%";

  }
  $scope.rating_mouseleave = function(event){
    var rating = angular.element(event.currentTarget).scope().company.rating;
    if(rating)
      event.currentTarget.children[0].style.width = rating/5 * 100  + "%";
    else event.currentTarget.children[0].style.width = "0%";
  }
  $scope.rating_click = function(event) {
    var rating = event.offsetX/event.currentTarget.offsetWidth * 5;
    //round to .5
    rating = Math.round(rating*2)/2;
    var company =  angular.element(event.currentTarget).scope().company;
    var rated = company.rating != null;
    var companyId = company.id;
    console.log('rating: '+rating);
    console.log('rated: '+rated);
    console.log('companyId: '+companyId);
  }
}]);
