'use strict';

describe('csrLookupApp.showCompany module', function() {

  beforeEach(module('csrLookupApp.showCompany'));

  describe('showCompany controller', function() {
    var scope, showCompanyCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      showCompanyCtrl = $controller('ShowCompanyCtrl', {$scope: scope});
    }));

    it('should be defined', inject(function($controller) {
      expect(showCompanyCtrl).toBeDefined();
    }));

  });
});
