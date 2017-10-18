angular.module('csrApp', [])
      .controller('TestController', ['$scope', function ($scope) {
        $scope.greetMe = 'World';
		$scope.mainTitle = "CSR Lookup";
      }]);

    // angular.element(function() {
      // angular.bootstrap(document, ['csrApp']);
    // });