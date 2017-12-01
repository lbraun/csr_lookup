'use strict';

describe('csrLookupApp.addCompany module', function() {

  beforeEach(module('csrLookupApp.addCompany'));

  describe('addCompany controller', function() {
    var scope, addCompanyCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      addCompanyCtrl = $controller('AddCompanyCtrl', {$scope: scope});
    }));

    it('should be defined', inject(function($controller) {
      expect(addCompanyCtrl).toBeDefined();
    }));

  });
});
