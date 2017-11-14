// angular.module('csrLookupApp', [])
      // .controller('TestController', ['$scope', function ($scope) {
        // $scope.greetMe = 'World';
		// $scope.mainTitle = "CSR Lookup";
      // }]);
angular.module('csrLookupApp').controller('TestController', ['$scope', '$location', function ($scope, $location) {
        $scope.greetMe = 'World';
		$scope.mainTitle = "CSR Lookup";
        $scope.on_search_button_click = function(){
            $location.path('searchResults/').search('search_word', $scope.company_search_word);
        }
      }]);
    // angular.element(function() {
      // angular.bootstrap(document, ['csrApp']);
    // });