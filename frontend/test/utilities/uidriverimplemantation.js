
import * as reportfactory from '../utilities/reportfactory'
let driverFactory  = require('../utilities/uitools/'+process.env.tool+'factory');

export async function initiatBrowserDriver() {
    var driver = await driverFactory.initiatWebDriver(process.env.browser);
    return await driver;
}

export async function quitDriver(driver) {
    await driverFactory.quitDriver(driver);
}
export async function getDriver(driver) {
    return await driverFactory.getDriver(driver);
}
export async function launchUrl(testParameter, url) {
    await driverFactory.launchUrl(testParameter, url);
}


export async function click(object, testParameter) {
    await driverFactory.click(object, testParameter);
}
export async function clickOnlyIfElementExist(object, testParameter) {
    await driverFactory.clickOnlyIfElementExist(object, testParameter);
}

export async function enterText(object, value, testParameter) {
    await driverFactory.enterText(object, value, testParameter);
}
export async function enterTextAndPressEnter(object, value, testParameter) {
    await driverFactory.enterTextAndPressEnter(object, value, testParameter);
}


export async function selectDropDown(object, value, testParameter) {
    await driverFactory.selectDropDown(object, value, testParameter);
}


export async function takeScreenshotOfElement(testParameter, object) {
    
    let screenshotName, datetime, screenshotPath;
   // const currentdate = new Date();
       // datetime = `${currentdate.getDate()}_${(currentdate.getMonth() + 1)}_${currentdate.getFullYear()}_${currentdate.getHours()}_${currentdate.getMinutes()}_${currentdate.getSeconds()}_${currentdate.getMilliseconds()}`;
      //  const testName = testParameter.testCaseName.replace(/ /g, '_');
        screenshotName = `${object.description}_Actual`;
        screenshotPath =  `${process.env.reportpath}/screenshots/${screenshotName}.png`;
        await driverFactory.takeScreenshotOfElement(screenshotPath, testParameter, object);
        return `${screenshotPath}`;
}

export async function takeScreenshotFullPage(pagename, testParameter) {
    return await driverFactory.takeScreenshotFullPage(pagename, testParameter);
}


export async function takeScreenshotOfPage(datetime, testParameter) {
    let screenshotName, screenshotpath;
    try {
        const testName = testParameter.testCaseName.replace(/ /g, '_');
        screenshotName = `${testName}_`;
        screenshotpath = `${process.env.reportpath}/screenshots/${screenshotName}${datetime}.png`;
        await driverFactory.takeScreenshotOfPage(screenshotpath, testParameter);
    } catch (err) {
        console.log(err);
    }
    return screenshotName;
}

export async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time || 1000);
    });
}
export async function merge(arrayImage, filename) {
    const mergeImg = require('merge-img');
    let img = await mergeImg(arrayImage, {
        direction: true
    });
    await img.write(filename);

    var waitOns = require('wait-on');
    var opts = {
        resources: [
            filename
        ],
        delay: 1000, // initial delay in ms, default 0
        interval: 100, // poll interval in ms, default 250ms
        timeout: 120000, // timeout in ms, default Infinity
        tcpTimeout: 1000, // tcp timeout in ms, default 300ms
        window: 1000, // stabilization time in ms, default 750ms
    };
    try {
        await waitOns(opts);
        // once here, all resources are available
    } catch (err) {
        console.log('File Not Cerated');
    }
  
}


export async function validateStaticElementSnapshots(testParameter, page_locators) {
    const fse = require('fs')
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');
    let pageName = page_locators.screenvalidation.pageName;
    let dataInputs = page_locators.screenvalidation.blocks;
    var dir = './test/applicationcomponents/snapshots/' + pageName+'/'+process.env.tool+'/'+process.env.browser;
    if (!fse.existsSync(dir)){
       // fse.mkdirSync(dir);
       fse.mkdirSync(dir,{recursive: true});
    }
    
    for (let i = 0; i < dataInputs.length; i++) {
        let imagePath = await takeScreenshotOfElement(testParameter, dataInputs[i]);
        await reportfactory.addHeaderLog((pageName + ' - Snapshopt validation of section ' + dataInputs[i].description).toUpperCase(), testParameter);
        let expectedSnapshotPath = dir + '/' + dataInputs[i].description + '.png';
        if (page_locators.screenvalidation.update_snaphot && dataInputs[i].update_snaphot) {
            await fse.copyFileSync(imagePath, expectedSnapshotPath, { clear: true })
        }
        await fse.copyFileSync(expectedSnapshotPath, imagePath.replace('_Actual.png', '_Expected.png'), { clear: true })

        const img1 = PNG.sync.read(fse.readFileSync(imagePath));
        const img2 = PNG.sync.read(fse.readFileSync(expectedSnapshotPath));
        const { width, height } = img1;
        const diff = new PNG({ width, height });
        let outputImagePath = imagePath.replace('_Actual.png', '_Final.png');
        try {
            let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 1 });
            fse.writeFileSync(outputImagePath, PNG.sync.write(diff));
          //  console.log('pixelMatch ' + numDiffPixels + dataInputs[i].description);
            let strStepStatus;
            if (numDiffPixels === 0) {
                strStepStatus = 'pass';
            } else {
                strStepStatus = 'fail';
            }
            numDiffPixels = numDiffPixels+' : '+dataInputs[i].description+' - UI Mismatch';
            await reportfactory.reportImageComparison('screenshots/' + dataInputs[i].description + '_Expected.png', 'screenshots/' + dataInputs[i].description + '_Actual.png', 'screenshots/' + dataInputs[i].description + '_Final.png', strStepStatus, numDiffPixels, testParameter);
        }
        catch (err) {
            await reportfactory.reportImageComparison('screenshots/' + dataInputs[i].description + '_Expected.png', 'screenshots/' + dataInputs[i].description + '_Actual.png', err, 'fail', 'Error', testParameter);
        }


    }
}


export async function validateFullPageSnapshot(testParameter, page_locators) {
    const fse = require('fs')
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');
    let pageName = page_locators.screenvalidation.pageName;
    var dir = './test/applicationcomponents/snapshots/' + pageName+'/'+process.env.tool+'/'+process.env.browser;
    if (!fse.existsSync(dir)){
       // fse.mkdirSync(dir);
       fse.mkdirSync(dir,{recursive: true});
    }
    let blnFullPageValidation = page_locators.screenvalidation.fullpage;
   
    await reportfactory.addHeaderLog((pageName + ' - Snapshopt validation of FullPage').toUpperCase(), testParameter);
    let imagePath = await takeScreenshotFullPage(pageName, testParameter);
    let expectedSnapshotPath = dir + '/' + pageName + '_FullPage_Expected.png';

    if (blnFullPageValidation && page_locators.screenvalidation.fullpage_Update_snaphot) {

        await fse.copyFileSync(imagePath, expectedSnapshotPath, { clear: true })
    }

    await fse.copyFileSync(expectedSnapshotPath, imagePath.replace('_Actual.png', '_Expected.png'), { clear: true })

    const img1 = PNG.sync.read(fse.readFileSync(imagePath));
    const img2 = PNG.sync.read(fse.readFileSync(expectedSnapshotPath));
    const { width, height } = img1;
    const diff = new PNG({ width, height });
    let outputImagePath = imagePath.replace('_Actual.png', '_Final.png');
    try {
        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 1 });
        fse.writeFileSync(outputImagePath, PNG.sync.write(diff));
        let strStepStatus;
        if (numDiffPixels === 0) {
            strStepStatus = 'pass';
        } else {
            strStepStatus = 'fail';
        }
        numDiffPixels = numDiffPixels+' : '+pageName+' Full Page - UI Mismatch';
        await reportfactory.reportImageComparison('screenshots/' + pageName + '_FullPage_Expected.png', 'screenshots/' + pageName + '_FullPage_Actual.png', 'screenshots/' + pageName + '_FullPage_Final.png', strStepStatus, numDiffPixels, testParameter);
    }
    catch (err) {
        await reportfactory.reportImageComparison('screenshots/' + pageName + '_FullPage_Expected.png', 'screenshots/' + pageName + '_FullPage_Actual.png', err, 'fail', 'Error', testParameter);
    }

}

export async function ValidatSnpashotsAcrossPage(testParameter, locators) {
    await launchUrl(testParameter, locators.url);
    //await t.debug();
    await validateStaticElementSnapshots(testParameter, locators);
    let blnFullPageValidation = locators.screenvalidation.fullpage;
    if (blnFullPageValidation) {
        await validateFullPageSnapshot(testParameter, locators);
    }
   // await ValidateBrokenLinks(testParameter);
}

export async function ValidateBrokenLinks(testParameter) {
    let allLinksURLS = [];
    let allValidLinksURLS = [];
    let allBrokenLinksURLS = [];
    let nonHttpLinksObserved = [];
    let elements = await testParameter.driver.findElements(By.xpath('//*[@href]'));
    for (let i = 0; i < await elements.length; i++) {
        allLinksURLS[i] = await elements[i].getAttribute("href");
        if(await allLinksURLS[i].startsWith('http')){
            let flag = await verifyValidURL(allLinksURLS[i]);
            if(flag){
             allValidLinksURLS.push(allLinksURLS[i]);
            }else{
             allBrokenLinksURLS.push(allLinksURLS[i]);
            }     
        }
        else{
            nonHttpLinksObserved.push(allLinksURLS[i]);
        }
    }
    
    if(allValidLinksURLS.length>0){
        await reportfactory.report(`Valid Links`, `Total Valid Links ${allValidLinksURLS.length} -  ${allValidLinksURLS.toString()}`, 'pass', testParameter);
    }

    if(allBrokenLinksURLS.length>0){
        await reportfactory.report(`Broken Links`, `Total Broken Links ${allBrokenLinksURLS.length} - ${allBrokenLinksURLS.toString()}`, 'fail', testParameter);
    }

    if(nonHttpLinksObserved.length>0){
        await reportfactory.report(`Non Http / Https Links`, `Total Non Http/Https Links ${nonHttpLinksObserved.length} - ${nonHttpLinksObserved.toString()}`, 'warning', testParameter);
    }
}


export async function verifyValidURL(url) {
    var validUrl = require('valid-url');
    let flag = false;
    if (validUrl.isUri(url)) {
        flag = true;
    }
    return flag;
}

export async function getImplemantationMethod(key, element, page) {
    let methodName , methodElement , methodAction;
   switch (key) {
       case 'CLICK':
         methodName = 'export async function click'+element+'(testParameter) {';
         methodElement = '\r\n let object = '+page+'.elements.'+element+';';
         methodAction = '\r\n await uifactory.click(object, testParameter); \r\n }';
        break;

        case 'SENDKEYS':
         methodName = 'export async function enter'+element+'(value, testParameter) {';
         methodElement = '\r\n let object = '+page+'.elements.'+element+';';
         methodAction = '\r\n await uifactory.enterText(object, value, testParameter); \r\n }';
        break;
        case 'SELECT':
            methodName = 'export async function select'+element+'(value, testParameter) {';
            methodElement = '\r\n let object = '+page+'.elements.'+element+';';
            methodAction = '\r\n await uifactory.selectDropDown(object, value, testParameter); \r\n }';
        break;
       default:
           break;
   }
   var result = methodName + methodElement + methodAction;
   return result;
}