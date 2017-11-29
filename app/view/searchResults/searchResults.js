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
    $scope.userId = 1;
    var searchWord = $location.search().search_word;
    if(searchWord) {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/companies/users/'+ $scope.userId +'/search/' + searchWord
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
    var company = angular.element(event.currentTarget).scope().company;
    var rated = company.user_rated;
    var rating = company.rating;
    if(rated)
      event.currentTarget.children[0].style.width = rating/5 * 100  + "%";
    else event.currentTarget.children[0].style.width = "0%";
  }
  $scope.rating_click = function(event) {
    var rating = event.offsetX/event.currentTarget.offsetWidth * 5;
    //round to .5
    rating = Math.round(rating*2)/2;
    var company =  angular.element(event.currentTarget).scope().company;
    var rated = company.user_rated;
    var companyId = company.id;
    $http({
      method: 'POST',
      url: 'http://localhost:3000/companies/' + companyId + '/rate/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        userId: $scope.userId,
        rated: rated,
        rating: rating
      }
    }).then(function successCallback(response) {
      company.rating = response.data;
      company.user_rated = true;
    }, function errorCallback(response) {
      // TODO: figure out how to raise a 404 in this case
    });
  }
}]);
