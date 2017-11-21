'use strict';

describe('csrLookupApp.advancedSearch module', function() {

  beforeEach(module('csrLookupApp.advancedSearch'));

  describe('advancedSearch controller', function(){
    var scope, advancedSearchCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      advancedSearchCtrl = $controller('AdvancedSearchCtrl', {$scope: scope});
    }));

    it('should be defined', inject(function($controller) {
      expect(advancedSearchCtrl).toBeDefined();
    }));

  });
});
