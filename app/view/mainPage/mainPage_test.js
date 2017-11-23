'use strict';

describe('csrLookupApp.mainPage module', function() {

  beforeEach(module('csrLookupApp.mainPage'));

  describe('mainPage controller', function() {

    it('should be defined', inject(function($controller) {
      var mainPageCtrl = $controller('MainPageCtrl');
      expect(mainPageCtrl).toBeDefined();
    }));

  });
});
