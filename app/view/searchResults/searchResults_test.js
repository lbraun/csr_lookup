'use strict';

describe('csrLookupApp.searchResults module', function() {

  beforeEach(module('csrLookupApp.searchResults'));

  describe('searchResults controller', function() {
    var scope, searchResultsCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      searchResultsCtrl = $controller('SearchResultsCtrl', {$scope: scope});
    }));

    it('should be defined', inject(function($controller) {
      expect(searchResultsCtrl).toBeDefined();
    }));
  });
});
