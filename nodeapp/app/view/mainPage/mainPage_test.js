'use strict';

describe('csrLookupApp.mainPage module', function() {

  beforeEach(module('csrLookupApp.mainPage'));

  describe('mainPage controller', function() {

    it('should define a controller', inject(function($controller) {
      //spec body
      var mainPageCtrl = $controller('MainPageCtrl');
      expect(mainPageCtrl).toBeDefined();
    }));

  });
});