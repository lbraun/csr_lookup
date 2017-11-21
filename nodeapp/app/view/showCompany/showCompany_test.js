'use strict';

describe('csrLookupApp.showCompany module', function() {

  beforeEach(module('csrLookupApp.showCompany'));

  describe('showCompany controller', function(){

    it('should be defined', inject(function($controller) {
      //spec body
      var showCompanyCtrl = $controller('ShowCompanyCtrl');
      expect(showCompanyCtrl).toBeDefined();
    }));

  });
});