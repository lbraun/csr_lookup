'use strict';

describe('csrLookupApp.version module', function() {
  beforeEach(module('csrLookupApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
