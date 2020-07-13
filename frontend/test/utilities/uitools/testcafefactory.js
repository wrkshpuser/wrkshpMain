import { t, Selector } from 'testcafe';
import * as reportfactory from '../reportfactory'

export async function launchUrl(testParameter, url) {
    
    console.log('Hello'+url);
    await t.navigateTo(`${url}`);
}


export async function getTestCafeObject(locator){
    let byLocator; 
    switch(locator[0].type) {
        case "css":
            byLocator = Selector(locator[0].value);
          break;
        default:
          // code block
      }
      return byLocator;
}

export async function click(object, testParameter) {
    try {
        await t.click(await getTestCafeObject(object.locator));
        await reportfactory.report(`${object.description} should be clicked`, `${object.description} is clicked`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be clicked`, `${object.description} is Not clicked, Error:`+err, 'fail', testParameter);
    }
}
export async function clickOnlyIfElementExist(object, testParameter) {
    try {
        await t.click(await getTestCafeObject(object.locator));
      //  await reportfactory.report(`${object.description} should be clicked`, `${object.description} is clicked`, 'actionPass', testParameter);
    } catch (err) {
      //  await reportfactory.report(`${object.description} should be clicked`, `${object.description} is Not clicked, Error:`+err, 'fail', testParameter);
    }
}

export async function enterText(object, value, testParameter) {
    try {
        await t.typeText(await getTestCafeObject(object.locator),value)
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is entered with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is not entered with value ${value} , Error:`+err, 'fail', testParameter);
    }
}


export async function enterTextAndPressEnter(object, value, testParameter) {
    try {
        await t.typeText(await getTestCafeObject(object.locator),value);
        await t.pressKey('enter');
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is entered with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is not entered with value ${value} , Error:`+err, 'fail', testParameter);
    }
}
export async function takeScreenshotOfElement(screenshotpath, testParameter, object) {
    let locatorTestcafe = await getTestCafeObject(object.locator);
    await t.takeElementScreenshot(locatorTestcafe, screenshotpath);
}


export async function takeScreenshotFullPage(pagename, testParameter) {
    let pathFP = `${process.env.reportpath}/screenshots/${pagename}_FullPage_Actual.png`;
    await t.takeScreenshot({ path: pathFP, fullPage: true});
    return pathFP;
}


export async function takeScreenshotOfPage(screenshotpath, testParameter) {
   await t.takeScreenshot({ path: screenshotpath, fullPage: false});
}