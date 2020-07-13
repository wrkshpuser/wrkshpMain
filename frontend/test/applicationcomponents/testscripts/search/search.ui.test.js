import * as reportfactory from '../../../utilities/reportfactory'
import * as uifactory from '../../../utilities/uidriverimplemantation'
import * as searchpage_steps from '../../stepdefinitions/ui-definitions/searchpage_steps'
import * as searchpage_locators from '../../pageobjects/searchpage_locators'

describe('Feature To Validate Seach Functionality', () => {
  let driver;
  let page;
  beforeEach(async () => {
    jest.resetModules() // this is important - it clears the cache
    jest.setTimeout(1000000);
    driver = await uifactory.initiatBrowserDriver();
    page = await uifactory.getDriver(driver);
  });

  afterEach(async () => {
    await uifactory.quitDriver(driver) ;
  });
  
  let testcaseName = "Search Functionality UI Visual Validation"
  let testdescription = "To Validate if UI for Search is Rendered Properly";
    test(testcaseName, async () => {
      let testParameter = await reportfactory.createTestReport(testcaseName, page, testdescription);
      try {
        await uifactory.ValidatSnpashotsAcrossPage(testParameter,searchpage_locators);
       
      }
      catch(err){
        await reportfactory.reportApi(`Test Not Complete - Exception Thrown`,"Error Message: "+ err +", Error Stack"+err.stack, 'fail', testParameter);
       // fail(`Test Not Complete - Exception Thrown`,"Error Message: "+ err +", Error Stack"+err.stack);
      }
      finally {
        await reportfactory.endTestReport(testParameter);
      }
    });



    
  });