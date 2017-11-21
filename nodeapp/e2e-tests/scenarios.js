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


  // These tests assume that the active database contains the seed data defined in seeds.sql
  describe('showCompany', function() {

    beforeEach(function() {
      browser.get('index.html#!/showCompany/1');
    });


    it('should render info about company 1 when user navigates to /showCompany/1', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/ESRI/);

      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Industry: software/);
    });

    it('should render company 1 evidence records when user navigates to /showCompany/1', function() {
      expect(element.all(by.css('[ng-view] h4')).first().getText()).
        toMatch(/Evidence of Social Responsibility/);

      expect(element.all(by.css('#evidence-record-1')).first().getText()).
        toMatch(/Fake Title/);
    });

  });
});
