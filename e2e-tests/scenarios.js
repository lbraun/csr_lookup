'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /mainPage when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/mainPage");
  });


  describe('mainPage', function() {

    beforeEach(function() {
      browser.get('index.html#!/mainPage');
    });


    it('should render mainPage when user navigates to /mainPage', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/This website lets you look up social responsibility/);
    });

  });


  describe('addCompany', function() {

    beforeEach(function() {
      browser.get('index.html#!/addCompany');
    });


    it('should render addCompany when user navigates to /addCompany', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/This is the partial for adding a new company./);
    });

  });


  describe('advancedSearch', function() {

    beforeEach(function() {
      browser.get('index.html#!/advancedSearch');
    });


    it('should render advancedSearch when user navigates to /advancedSearch', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/This is the partial for Advanced Search./);
    });

  });
});
