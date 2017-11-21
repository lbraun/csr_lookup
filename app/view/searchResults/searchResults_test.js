'use strict';

describe('csrLookupApp.searchResults module', function() {

  beforeEach(module('csrLookupApp.searchResults'));

  describe('searchResults controller', function() {

    it('should be defined', inject(function($controller) {
      //spec body
      var searchResultsCtrl = $controller('SearchResultsCtrl');
      expect(searchResultsCtrl).toBeDefined();
    }));
  });
});
