'use strict';

describe('csrLookupApp.addCompany module', function() {

  beforeEach(module('csrLookupApp.addCompany'));

  describe('addCompany controller', function(){

    it('should be defined', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('AddCompanyCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});