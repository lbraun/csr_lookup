'use strict';

angular.module('csrLookupApp.version', [
  'csrLookupApp.version.interpolate-filter',
  'csrLookupApp.version.version-directive'
])

.value('version', '0.1');
