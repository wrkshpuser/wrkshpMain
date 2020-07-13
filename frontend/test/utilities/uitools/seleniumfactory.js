import {Builder, until, By, Key } from "selenium-webdriver";
import * as reportfactory from '../reportfactory'

let chrome = require('chromedriver');
let firefox = require('geckodriver');
/*let internetexplorer = require('iedriver');
const ie = require('selenium-webdriver/ie');
let service = new ie.ServiceBuilder("C:/Users/303236/Downloads/IEDriverServer_x64_3.150.1/IEDriverServer.exe");
*/

export async function initiatWebDriver(browser) {
    
       /* const options = new ie.Options().introduceFlakinessByIgnoringProtectedModeSettings(true);

        let driver = await new Builder()
                .setIeService(service)
                .forBrowser('internet explorer').setIeOptions(options)
                .build();*/
    var driver = new Builder()
        .forBrowser(browser)
        .build();
    await driver.manage().window().maximize();
    return driver;
}

export async function getSeleniumObject(locator){
    let byLocator; 
    switch(locator[0].type) {
        case "css":
            byLocator = By.css(locator[0].value);
          break;
        case "xpath":
            byLocator = By.xpath(locator[0].value);
          break;
          case "id":
            byLocator = By.id(locator[0].value);
          break;
        default:
          // code block
      }
      return byLocator;
}

export async function launchUrl(testParameter, url) {
    await testParameter.driver.get(url)
}
export async function getDriver(driver) {
    return await driver;
}
export async function quitDriver(driver) {
    await driver.quit();
}
export async function findElement(locator, description, testParameter) {
    const byLocator = await getSeleniumObject(locator);
    try {
        return await testParameter.driver.findElement(byLocator);
    } catch (err) {
        await reportfactory.report(`${description} should be present`, `${description} is not present`, 'fail', testParameter);
    }
}

export async function click(object, testParameter) {
    try {
        // let element = await driver.wait(until.elementLocated(object.locator),10000);
        let element = await findElement(object.locator, object.description, testParameter);
        await testParameter.driver.executeScript("arguments[0].scrollIntoView(false);", element);
        await element.click();
        await reportfactory.report(`${object.description} should be clicked`, `${object.description} is clicked`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be clicked`, `${object.description} is Not clicked, Error:`+err, 'fail', testParameter);
    }
}
export async function enterText(object, value, testParameter) {
    try {
        let byLoctor = await getSeleniumObject(object.locator);
        let element = await testParameter.driver.wait(until.elementLocated(byLoctor), 10000);
        await element.sendKeys(value);
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is entered with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is not entered with value ${value} , Error:`+err, 'fail', testParameter);
    }
}
export async function enterTextAndPressEnter(object, value, testParameter) {
    try {
        let byLoctor = await getSeleniumObject(object.locator);
        let element = await testParameter.driver.wait(until.elementLocated(byLoctor), 10000);
        await element.sendKeys(value, Key.ENTER);
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is entered with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be entered with value ${value}`, `${object.description} is not entered with value ${value} , Error:`+err, 'fail', testParameter);
    }
}

export async function selectDropDown(object, value, testParameter) {
    try {
        let byLoctor = await getSeleniumObject(object.locator);
        let element = await testParameter.driver.wait(until.elementLocated(byLoctor), 10000);
        let options = await element.findElements(By.tagName('option'));
        
        for(var i=0; i< await options.length; i++) {
            let valueAct = await options[i].getText();
          if (  valueAct== value ) {
            await element.click();
            await options[i].click();
            break;
          }
        }
        await reportfactory.report(`${object.description} should be selected with value ${value}`, `${object.description} is selected with value ${value}`, 'actionPass', testParameter);
    } catch (err) {
        await reportfactory.report(`${object.description} should be selected with value ${value}`, `${object.description} is not selected with value ${value} , Error:`+err, 'fail', testParameter);
    }
}


export async function waitForElementLocation(object, time, testParameter) {
    try {
        let element = await testParameter.driver.wait(until.elementLocated(await getSeleniumObject(object.locator)), time);
    } catch (err) {
        await reportfactory.report(`${object.description} should be located`, `${object.description} is not located in time ms ` + time, 'fail', testParameter);
    }
}

export async function takeScreenshotOfElement(screenshotPath, testParameter, object) {
    let element = await findElement(object.locator, object.description, testParameter);
    let image = await element.takeScreenshot();
    await require('fs').writeFileSync(screenshotPath, image, 'base64', function (err) {
        console.log(err);
    });
}

export async function takeScreenshotFullPage(pagename, testParameter) {
    let screenshotName;
    var imageArr = [];
    try {
        await testParameter.driver.executeScript(`window.scrollTo(0, 0)`)
        const testName = testParameter.testCaseName.replace(/ /g, '_');
        screenshotName = `${testName}_${pagename}`;
//offsetHeight
        var totalHeight = await testParameter.driver.executeScript('return document.body.scrollHeight')
        var windowHeight = await testParameter.driver.executeScript('return window.innerHeight')
        var windowWidth = await testParameter.driver.executeScript('return window.innerWidth')
        
        for (var i = 0; i <= (totalHeight / windowHeight); i++) {
            await testParameter.driver.executeScript(`window.scrollTo(0, window.innerHeight*${i})`)
            //await sleep(3000); 
            let image = await testParameter.driver.takeScreenshot();


            var intVal = Math.floor(totalHeight / windowHeight)
            if (i === intVal) {
                require('fs').writeFileSync(`${process.env.reportpath}/screenshots/${screenshotName}${i}.png`, image.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
                    console.log(err);
                });

                let fullVal = totalHeight / windowHeight;
                let topVal = Math.floor((fullVal - intVal) * windowHeight);
                let heightVal = windowHeight - topVal;
                let originalImage = `${process.env.reportpath}/screenshots/${screenshotName}${i}.png`;
                let outputImage = `${process.env.reportpath}/screenshots/${screenshotName}${i}final.png`;
                var Jimp = require('jimp');

                const newimage = await Jimp.read(originalImage);
                if(topVal > 0 ){
                    await newimage.crop(0, heightVal, windowWidth, topVal).writeAsync(outputImage);
                    imageArr.push(`${outputImage}`);
                }else{
                    imageArr.push(`${originalImage}`);
                }
            } else {
                require('fs').writeFileSync(`${process.env.reportpath}/screenshots/${screenshotName}${i}.png`, image.replace(/^data:image\/png;base64,/, ''), 'base64', function (err) {
                    console.log(err);
                });
                imageArr.push(`${process.env.reportpath}/screenshots/${screenshotName}${i}.png`);
            }
        }

    } catch (err) {
        console.log(err);
    }
    const imgaeProm = await merge(imageArr, `${process.env.reportpath}/screenshots/${pagename}_FullPage_Actual.png`);
   // console.log('Merge Ends');
    return `${process.env.reportpath}/screenshots/${pagename}_FullPage_Actual.png`;
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
    //require('fs').writeFileSync(`${}`, img, 'base64', function (err) {
    //console.log(err);
    //});
    // return await img.write(filename);
}

export async function takeScreenshotOfPage(screenshotpath, testParameter) {
    let image;
    try {
        image = await testParameter.driver.takeScreenshot();
        require('fs').writeFileSync(screenshotpath, image, 'base64', function (err) {
            console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
}


export async function validateStaticElementSnapshots(testParameter, page_locators) {
    const fse = require('fs')
    const PNG = require('pngjs').PNG;
    const pixelmatch = require('pixelmatch');
    let pageName = page_locators.screenvalidation.pageName;
    let dataInputs = page_locators.screenvalidation.blocks;
    for (let i = 0; i < dataInputs.length; i++) {
        let imagePath = await takeScreenshotOfElement(testParameter, dataInputs[i]);
        await reportfactory.addHeaderLog((pageName + ' - Snapshopt validation of section ' + dataInputs[i].description).toUpperCase(), testParameter);
        let expectedSnapshotPath = './applicationcomponents/snapshots/' + pageName + '/' + dataInputs[i].description + '.png';
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
            let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.5 });
            fse.writeFileSync(outputImagePath, PNG.sync.write(diff));
            console.log('pixelMatch ' + numDiffPixels + dataInputs[i].description);
            let strStepStatus;
            if (numDiffPixels === 0) {
                strStepStatus = 'pass';
            } else {
                strStepStatus = 'fail';
            }
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

    let blnFullPageValidation = page_locators.screenvalidation.fullpage;
    let pageName = page_locators.screenvalidation.pageName;
    await reportfactory.addHeaderLog((pageName + ' - Snapshopt validation of FullPage').toUpperCase(), testParameter);
    let imagePath = await takeScreenshotFullPage(pageName, testParameter);
    let expectedSnapshotPath = './applicationcomponents/snapshots/' + pageName + '/' + pageName + '_FullPage_Expected.png';

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
        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.5 });
        fse.writeFileSync(outputImagePath, PNG.sync.write(diff));
        let strStepStatus;
        if (numDiffPixels === 0) {
            strStepStatus = 'pass';
        } else {
            strStepStatus = 'fail';
        }
        await reportfactory.reportImageComparison('screenshots/' + pageName + '_FullPage_Expected.png', 'screenshots/' + pageName + '_FullPage_Actual.png', 'screenshots/' + pageName + '_FullPage_Final.png', strStepStatus, numDiffPixels, testParameter);
    }
    catch (err) {
        await reportfactory.reportImageComparison('screenshots/' + pageName + '_FullPage_Expected.png', 'screenshots/' + pageName + '_FullPage_Actual.png', err, 'fail', 'Error', testParameter);
    }

}

export async function ValidatSnpashotsAcrossPage(testParameter, locators) {
    await launchUrl(testParameter, locators.url);
    await validateStaticElementSnapshots(testParameter, locators);
    let blnFullPageValidation = locators.screenvalidation.fullpage;
    if (blnFullPageValidation) {
        await validateFullPageSnapshot(testParameter, locators);
    }
    await ValidateBrokenLinks(testParameter);
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
