'use strict';

describe('csrLookupApp.advancedSearch module', function() {

  beforeEach(module('csrLookupApp.advancedSearch'));

  describe('advancedSearch controller', function(){

    it('should be defined', inject(function($controller) {
      //spec body
      var advancedSearchCtrl = $controller('AdvancedSearchCtrl');
      expect(advancedSearchCtrl).toBeDefined();
    }));

  });
});