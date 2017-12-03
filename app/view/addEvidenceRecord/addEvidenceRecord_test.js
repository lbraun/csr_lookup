'use strict';

describe('csrLookupApp.addEvidenceRecord module', function() {

  beforeEach(module('csrLookupApp.addEvidenceRecord'));

  describe('addEvidenceRecord controller', function() {
    var scope, addEvidenceRecordCtrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      addEvidenceRecordCtrl = $controller('AddEvidenceRecordCtrl', {$scope: scope});
    }));

    it('should be defined', inject(function($controller) {
      expect(addEvidenceRecordCtrl).toBeDefined();
    }));

  });
});
