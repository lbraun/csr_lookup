angular.module('csrLookupApp').controller('TestController', ['$scope', '$location', function($scope, $location) {
  $scope.mainTitle = "CSR Lookup";

  $scope.on_search_button_click = function() {
    $location.path('searchResults/').search('search_word', $scope.company_search_word);
  }
}]);