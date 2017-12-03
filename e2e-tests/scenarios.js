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
    describe('when user navigates to /addCompany', function() {
      beforeEach(function() {
        browser.get('index.html#!/addCompany');
      });

      it('should render a proper title', function() {
        var title = element.all(by.css('h1')).first().getText();
        expect(title).toBe('Add a new company');
      });

      it('should allow the user to create a new company', function() {
        var company_name = element(by.id('company_name'));
        var company_industry = element(by.id('company_industry'));
        var company_wikipedia_name = element(by.id('company_wikipedia_name'));
        var submit_button = element(by.id('submit_button'));

        company_name.sendKeys('Test Company');
        company_industry.sendKeys('Test Industry');
        company_wikipedia_name.sendKeys('Corporate_social_responsibility');

        expect(company_name.getAttribute('value')).toBe('Test Company');
        expect(company_industry.getAttribute('value')).toBe('Test Industry');
        expect(company_wikipedia_name.getAttribute('value'))
          .toBe('Corporate_social_responsibility');

        submit_button.click();

        var title = element.all(by.css('h1')).first().getText();
        var industry_text = element(by.id('industry_text')).getText();
        var wikipedia_link = element(by.id('wikipedia_link')).getAttribute('href');

        expect(title).toBe('Test Company');
        expect(industry_text).toBe('Industry: Test Industry');
        expect(wikipedia_link)
          .toBe('https://en.wikipedia.org/wiki/Corporate_social_responsibility');
      });
    });
  });


  describe('addEvidenceRecord', function() {
    describe('when user navigates to a company show page', function() {
      beforeEach(function() {
        browser.get('index.html#!/addCompany');

        var company_name = element(by.id('company_name'));
        var company_industry = element(by.id('company_industry'));
        var company_wikipedia_name = element(by.id('company_wikipedia_name'));
        var submit_button = element(by.id('submit_button'));

        company_name.sendKeys('Test Company');
        company_industry.sendKeys('Test Industry');
        company_wikipedia_name.sendKeys('Corporate_social_responsibility');

        submit_button.click();
      });

      it('should render an link to add evidence', function() {
        var title = element.all(by.css('h1')).first().getText();
        expect(title).toBe('Test Company');

        var add_evidence_link = element(by.id('add-evidence-link'));
        expect(add_evidence_link.getText()).toBe('Add new evidence');
        expect(add_evidence_link.getAttribute('href'))
          .toMatch(/http:\/\/localhost:8000\/index.html#!\/showCompany\/\d*\/addEvidenceRecord/);
      });

      it('should allow the user to create a new evidence record', function() {
        var add_evidence_link = element(by.id('add-evidence-link'));
        add_evidence_link.click();

        var title = element.all(by.css('h1')).first().getText();
        expect(title).toBe('Add new evidence about Test Company');

        var title = element(by.id('evidence_record_title'));
        var reference_url = element(by.id('evidence_record_reference_url'));
        var reference_title = element(by.id('evidence_record_reference_title'));
        var description = element(by.id('evidence_record_description'));
        var score = element(by.id('evidence_record_score'));
        var submit_button = element(by.id('submit_button'));

        title.sendKeys('Test Title');
        reference_url.sendKeys('https://www.google.com/search?q=test');
        reference_title.sendKeys('Test Reference Title');
        description.sendKeys('Test Description');
        score.sendKeys('7.5');

        expect(title.getAttribute('value')).toBe('Test Title');
        expect(reference_url.getAttribute('value')).toBe('https://www.google.com/search?q=test');
        expect(reference_title.getAttribute('value')).toBe('Test Reference Title');
        expect(description.getAttribute('value')).toBe('Test Description');
        expect(score.getAttribute('value')).toBe('7.5');

        submit_button.click();

        var title = element.all(by.css('h1')).first().getText();
        var evidence_record_title = element.all(by.css('h4.card-title')).first().getText();
        var evidence_record_description = element.all(by.css('p.evidence-record-description')).first().getText();
        var evidence_record_reference_title = element.all(by.css('p.evidence-record-reference')).first().getText();
        var evidence_record_reference_url = element.all(by.css('p.evidence-record-reference > a')).first().getAttribute('href');
        var evidence_record_score = element.all(by.css('p.evidence-record-score')).first().getText();

        expect(title).toBe('Test Company');
        expect(evidence_record_title).toBe('Test Title');
        expect(evidence_record_description).toBe('Test Description');
        expect(evidence_record_reference_title).toBe('Reference: Test Reference Title');
        expect(evidence_record_reference_url).toBe('https://www.google.com/search?q=test');
        expect(evidence_record_score).toBe('Score: 7.5');
      });
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

  // // These searchResults tests assume that the active database contains the seed data defined in seeds.sql
  // // Therefore they don't work with Travis so I'm commenting them out for now
  // describe('searchResults', function() {

  //   beforeEach(function() {
  //     browser.get('index.html#!/searchResults?search_word=rcad');
  //   });


  //   it('should render searchResults for the letters "rcad" when user navigates to /searchResults?search_word=rcad', function() {
  //     expect(element.all(by.css('a.search-result-link')).first().getText()).
  //       toMatch(/Mercadona/);
  //   });

  // });


  // // These showCompany tests assume that the active database contains the seed data defined in seeds.sql
  // // Therefore they don't work with Travis so I'm commenting them out for now
  // describe('showCompany', function() {

  //   beforeEach(function() {
  //     browser.get('index.html#!/showCompany/1');
  //   });


  //   it('should render info about company 1 when user navigates to /showCompany/1', function() {
  //     expect(element.all(by.css('[ng-view] h1')).first().getText()).
  //       toMatch(/ESRI/);

  //     expect(element.all(by.css('[ng-view] p')).first().getText()).
  //       toMatch(/Industry: software/);
  //   });

  //   it('should render company 1 evidence records when user navigates to /showCompany/1', function() {
  //     expect(element.all(by.css('[ng-view] h4')).first().getText()).
  //       toMatch(/Evidence of Social Responsibility/);

  //     expect(element.all(by.css('#evidence-record-1')).first().getText()).
  //       toMatch(/Fake Title/);
  //   });

  // });
});
