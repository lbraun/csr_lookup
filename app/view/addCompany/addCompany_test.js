'use strict';

describe('csrLookupApp.addCompany module', function() {

  beforeEach(module('csrLookupApp.addCompany'));

  describe('addCompany controller', function(){

    it('should be defined', inject(function($controller) {
      var addCompanyCtrl = $controller('AddCompanyCtrl');
      expect(addCompanyCtrl).toBeDefined();
    }));

  });
});
