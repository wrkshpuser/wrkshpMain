const puppeteer = require('puppeteer');
import * as reportfactory from '../reportfactory'

export async function initiatWebDriver(browser) {
    let headlessFalg = false;
    let browserDriver = await puppeteer.launch({headless: headlessFalg});
    return browserDriver;
}


export async function getPuppeteerObject(locator){
    let byLocator; 
    switch(locator[0].type) {
        case "css":
            byLocator = locator[0].value;
          break;
        case "xpath":
            byLocator = locator[0].value;
          break;
          case "id":
            byLocator = locator[0].value;
          break;
        default:
          // code block
      }
      return byLocator;
}

export async function launchUrl(testParameter, url) {
    await testParameter.driver.goto(url);
    //await testParameter.driver.waitForNavigation({ waitUntil: 'networkidle0' });
}
export async function quitDriver(driver) {
    await driver.close();
}
export async function getDriver(driver) {
    return await driver.newPage();
}
export async function click(object, testParameter) {
    try {
        let locatorPuppeteer = await getPuppeteerObject(object.locator);
        await testParameter.driver.click(locatorPuppeteer);
        await reportfactory.report(`${object.description} should be clicked`, `${object.description} is clicked`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be clicked`, `${object.description} is Not clicked, Error:`+err, 'fail', testParameter);
    }
}

export async function enterText(object, value, testParameter) {
    try {
        let locatorPuppeteer = await getPuppeteerObject(object.locator);
        await testParameter.driver.type(locatorPuppeteer, value);
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is entered with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is not entered with value ${value} , Error:`+err, 'fail', testParameter);
    }
}
export async function enterTextAndPressEnter(object, value, testParameter) {
    try {
        let locatorPuppeteer = await getPuppeteerObject(object.locator);
        await testParameter.driver.type(locatorPuppeteer, value);
        await testParameter.driver.keyboard.press('Enter');
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is entered with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is not entered with value ${value} , Error:`+err, 'fail', testParameter);
    }
}


export async function selectDropDown(object, value, testParameter) {
    try {
        let locatorPuppeteer = await getPuppeteerObject(object.locator);
        await testParameter.driver.select(locatorPuppeteer, value);
        await reportfactory.report(`${object.description} should be selected with value ${value}`, `${object.description} is selected with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be selected with value ${value}`, `${object.description} is not selected with value ${value} , Error:`+err, 'fail', testParameter);
    }
}

export async function takeScreenshotOfElement(screenshotPath, testParameter, object) {
    let locatorPuppeteer = await getPuppeteerObject(object.locator);
    const element = await testParameter.driver.$(locatorPuppeteer);    
    let image = await element.screenshot();
    await require('fs').writeFileSync(screenshotPath, image, 'base64', function (err) {
        console.log(err);
    });
}


export async function takeScreenshotFullPage(pagename, testParameter) {
    let pathFP = `${process.env.reportpath}/screenshots/${pagename}_FullPage_Actual.png`;
    await testParameter.driver.screenshot({path: pathFP, fullPage: true}); 
    return pathFP;
}


export async function takeScreenshotOfPage(screenshotpath, testParameter) {
   let image = await testParameter.driver.screenshot();
   require('fs').writeFileSync(screenshotpath, image, 'base64', function (err) {
    console.log(err);
    });
}

