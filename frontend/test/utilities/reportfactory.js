const app = require('../applicationconfiguration.json');

export async function createBaseReportHTML(testName, driver, testdescription) {
  const currentdate = new Date();
let browserused = process.env.browser;
  let testParameter={
    "testCaseName": testName,
    "driver":driver,
    "reportName":"",
    "jsonReport":""
  }
  let testcaseDetails = {
    "testCaseName": testName,
    "testdescription": testdescription,
    "browser":browserused,
    "platform":"Windows",
    "startTime": currentdate,
    "reportName":"",
    "stepNumber":0,
    "stepsPassed":0,
    "stepsFailed":0,
    "jsonReport":"",
    "overallTime":"",
    "failureReason":[]
  }
  const fs = require('fs');
  const dirRS = process.env.reportpath;
  const tool = process.env.tool;
  let testCaseName = testcaseDetails.testCaseName;
  const browserName = testcaseDetails.browser;
  testCaseName = `${testCaseName}_${browserName}`;
  const rawdataNew = fs.readFileSync('./test/utilities/report-libs/template/ReportTemplate.txt');
  let result = rawdataNew.toString();
  result = result.replace('#{ReportTitle}', testCaseName);
  result = result.replace('#{ReportTitle}', testCaseName);
  result = result.replace('#{Time}', testcaseDetails.startTime);
  result = result.replace('#{Browser}', browserName);
  result = result.replace('#{ExecutionMode}', 'Local');
  result = result.replace('#{Platform}', testcaseDetails.platform);
  fs.writeFileSync(`${dirRS}//${testCaseName.replace(/ /g,'_')}.html`, result, 'utf8', () => {
  });
  testcaseDetails.reportName=`${dirRS}//${testCaseName.replace(/ /g,'_')}.html`;
  testcaseDetails.jsonReport = `${dirRS}/json/${testCaseName.replace(/ /g,'_')}.json`;


  testParameter.reportName = testcaseDetails.reportName;
  testParameter.jsonReport = testcaseDetails.jsonReport

  var data = JSON.stringify(testcaseDetails);
  fs.writeFileSync(testcaseDetails.jsonReport, data, () => {
  });
  return testParameter;
}

export async function updateTestLog(strStepNumber, strStepName, strStepDescription, strStatus, strTime, strScreenshotName, testParameter) {
  let methodNameCodeBlock;
  if (strScreenshotName === 'NA') {
    methodNameCodeBlock = `<tr class="content"> <td> ${strStepNumber} </td> <td class="justified"> ${strStepName} </td> <td class="justified"> ${strStepDescription} </td> <td class=" ${strStatus} "> ${strStatus.charAt(0).toUpperCase()}${strStatus.substring(1)} </td> <td> <small>${strTime.replace(/_/g, ':')} </small></td> <td> </td> </tr>`;
  } else {
    const strScreenshotpath = `screenshots/${strScreenshotName}.png`;
    let base64Img = 'data:image/png;base64,'+await base64_encode(`${process.env.reportpath}//`+strScreenshotpath);
    methodNameCodeBlock = `<tr class="content"> <td> ${strStepNumber} </td> <td class="justified"> ${strStepName} </td> <td class="justified"> ${strStepDescription} </td> <td class="${strStatus}">${strStatus.charAt(0).toUpperCase()}${strStatus.substring(1)} </td> <td><small> ${strTime.replace(/_/g, ':')} </small></td> <td><img src= "${base64Img}" ></img></td> </tr>`;
  }
  const fs = require('fs');
  fs.appendFileSync(testParameter.reportName, methodNameCodeBlock);

/*
  const updater = fs.createWriteStream(testParameter.reportName, {
    flags: 'a', // 'a' means appending (old data will be preserved)
  });
  updater.write(methodNameCodeBlock);
  updater.end();
  */
}
export async function base64_encode(file) {
  // read binary data
  const fs = require('fs');
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

export async function updateTestLogImageComparison(intStepNumber, strExpectedImage, strActualImage, strDifferenceImage, strStatus, strDifferenceOutput, testParameter) {
  let methodNameCodeBlock;
  let base64ImgExpected = 'data:image/png;base64,'+await base64_encode(`${process.env.reportpath}//`+strExpectedImage);
  let base64ImgActual = 'data:image/png;base64,'+await base64_encode(`${process.env.reportpath}//`+strActualImage);

  if (!(strDifferenceOutput === 'Error')) {
    let base64ImgDifference = 'data:image/png;base64,'+await base64_encode(`${process.env.reportpath}//`+strDifferenceImage);
    methodNameCodeBlock = `<tr class="content"> <td> ${intStepNumber} </td> <td><img src= "${base64ImgExpected}" ></img></td> <td><img src= "${base64ImgActual}" ></img></td> <td class=" ${strStatus} "> ${strStatus.charAt(0).toUpperCase()}${strStatus.substring(1)} </td> <td> <small> Difference:- ${strDifferenceOutput} </small></td> <td><img src="${base64ImgDifference}"></img></td> </tr>`;
  }else{
    methodNameCodeBlock = `<tr class="content"> <td> ${intStepNumber} </td> <td><img src= "${base64ImgExpected}" ></img></td> <td><img src= "${base64ImgActual}" ></img></td> <td class=" ${strStatus} "> ${strStatus.charAt(0).toUpperCase()}${strStatus.substring(1)} </td> <td> <small> Difference:- ${strDifferenceOutput} </small></td> <td>${strDifferenceImage}</td> </tr>`;
  }
  const fs = require('fs');
  fs.appendFileSync(testParameter.reportName, methodNameCodeBlock);

  /*
  const fs = require('fs');
  const updater = fs.createWriteStream(testParameter.reportName, {
    flags: 'a', // 'a' means appending (old data will be preserved)
  });
  updater.write(methodNameCodeBlock);
  updater.end();
  */
}



export async function finalizeReportHTML(testParameter) {
  const fs = require('fs');
  const reportPath = `${testParameter.reportName}`;
  const rawdataFooter = fs.readFileSync('./test/utilities/report-libs/template/FooterTemplate.txt');
  const currentdateEndTime = new Date();
  let result = rawdataFooter.toString();
  let testconsolidatedreport =  await require('../.'+testParameter.jsonReport);
  const startTime = new Date(testconsolidatedreport.startTime);

  let delta = Math.abs(currentdateEndTime - startTime) / 1000;
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;
  
  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  
  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  
  // what's left is seconds
  let seconds = Math.round(delta % 60);
  const diffMins = minutes+' Min '+seconds+' Sec';
  result = result.replace('#{TotalDuration}', diffMins);
  result = result.replace('#{StepsPassed}', testconsolidatedreport.stepsPassed);
  result = result.replace('#{StepsFailed}', testconsolidatedreport.stepsFailed);
  const finalize = fs.createWriteStream(reportPath, {
    flags: 'a', // 'a' means appending (old data will be preserved)
    autoClose: true,
  });
  finalize.write(result);
  finalize.end();
  
  testconsolidatedreport.overallTime = diffMins;
  var data = JSON.stringify(testconsolidatedreport);
  fs.writeFileSync(testParameter.jsonReport, data,{encoding:'utf8',flag:'w'}, () => {
  });
}

export async function addHeaderLog(header, testParameter) {
  const reportPath = `${testParameter.reportName}`;
  const headerUpdator = `<tr class="content"> <td colspan='6' align='left'> <h3> <b> ${header} </b> </h3> </td> </tr>`;
  const fs = require('fs');
  fs.appendFileSync(testParameter.reportName, headerUpdator);
/*
  const updater = fs.createWriteStream(reportPath, {
    flags: 'a',
  });
  updater.write(headerUpdator);
  updater.end();
  */
}

export async function updateTestSummary(testParameter) {
  let testconsolidatedreport =  await require('../.'+testParameter.jsonReport);
  let strFailed = testconsolidatedreport.stepsFailed;
  let strPassed = testconsolidatedreport.stepsPassed;
  let strTestCaseName = testconsolidatedreport.testCaseName.replace(/ /g,'_');
  let strTime = testconsolidatedreport.overallTime;
  let strFailureReason = testconsolidatedreport.failureReason;
  let strDescription = testconsolidatedreport.testdescription;
  let strBrowser= testconsolidatedreport.browser;
  const currentdateEndTime = new Date();
 let strStatus;
  if(strFailed===0){
    strStatus ='pass';
 } else{
    strStatus ='fail';
 }
  let methodNameCodeBlock;
  methodNameCodeBlock = `<tr> <td><a href = '${strTestCaseName}_${strBrowser}.html' > <small> ${testconsolidatedreport.testCaseName}_${strBrowser} </small> </a> </td> <td> <small> ${strDescription} </small> </td> <td class= "${strStatus}">${strStatus.charAt(0).toUpperCase()}${strStatus.substring(1)} </td> <td name= 'testEndTime' id = '${currentdateEndTime}' > <small> ${strTime} </small> </td> <td> <small> <b> ${strPassed} </b> </small> </td> <td> <small> <b> ${strFailed} </b> </small> </td> <td> ${strFailureReason} </td> </tr> <!--update-->`;
  const fs = require('fs');
  const dirRS = process.env.reportpath;
  const replace = require('replace-in-file');
  const options = {
    files: `${dirRS}//Summary.html`,
    from: /<!--update-->/g,
    to: methodNameCodeBlock,
  };
  try {
    const results = replace.sync(options);
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}


export async function createTestReport(testcaseName, driver, testdescription) {
  let testParameter = await createBaseReportHTML(testcaseName, driver, testdescription);
    await addHeaderLog(testdescription, testParameter);
    return testParameter;
}



export async function endTestReport(testParameter) {
      await finalizeReportHTML(testParameter);
      await updateTestSummary(testParameter);
}



export async function reportApi(strRequest, strResponse, strReport, strStatus, testParameter) {
  console.log('../.' + testParameter.jsonReport);
  let testconsolidatedreport = await require('../.' + testParameter.jsonReport);
  let intStepNumber = testconsolidatedreport.stepNumber;
  intStepNumber = intStepNumber + 1;
  testconsolidatedreport.stepNumber = intStepNumber;
  if (strStatus === 'pass' || strStatus === 'fail') {
      if (strStatus === 'pass') {
          let intStepPassed = testconsolidatedreport.stepsPassed;
          intStepPassed = intStepPassed + 1;
          testconsolidatedreport.stepsPassed = intStepPassed;
      } else {
          let intStepFailed = testconsolidatedreport.stepsFailed;
          intStepFailed = intStepFailed + 1;
          testconsolidatedreport.stepsFailed = intStepFailed;
          testconsolidatedreport.failureReason =  testconsolidatedreport.failureReason +'<li name ="failureReason"> <small>'+ strReport+'</small> </li>';
      }
  }
  await updateTestLogAPI(intStepNumber, strRequest, strResponse, strReport, strStatus, testParameter);
  var data = JSON.stringify(testconsolidatedreport);
  const fs = require('fs');
  fs.writeFileSync(testParameter.jsonReport, data, { encoding: 'utf8', flag: 'w' }, () => {
  });
}


export async function updateTestLogAPI(intStepNumber, strRequest, strResponse, strReport, strStatus, testParameter) {
  let methodNameCodeBlock;
  methodNameCodeBlock = `<tr class="content"> <td> ${intStepNumber} </td> <td>${strRequest}</td> <td>${strResponse}</td> <td class=" ${strStatus} "> ${strStatus.charAt(0).toUpperCase()}${strStatus.substring(1)} </td> <td> <small> Difference:- </small></td> <td>${strReport}</td> </tr>`;
  const fs = require('fs');
  fs.appendFileSync(testParameter.reportName, methodNameCodeBlock);
}


export async function report(strStepName, strStepDescription, strStepStatus, testParameter) {
  let testconsolidatedreport = await require('../.' + testParameter.jsonReport);
  if (strStepStatus === 'actionPass') {
      if (app.actionScreenshot) {
          strStepStatus = 'pass'
      }
      else {
          strStepStatus = 'done'
      }
  }

  let intStepNumber = testconsolidatedreport.stepNumber;
  intStepNumber = intStepNumber + 1;
  testconsolidatedreport.stepNumber = intStepNumber;
  let screenshotName;
  screenshotName = 'NA';
  const currentdate = new Date();
  const dateTimeLocal = `${currentdate.getDate()}_${(currentdate.getMonth() + 1)}_${currentdate.getFullYear()}_${currentdate.getHours()}_${currentdate.getMinutes()}_${currentdate.getSeconds()}_${currentdate.getMilliseconds()}`;
  if (strStepStatus === 'pass' || strStepStatus === 'fail') {
      const uidriverimplemantation =  require('../utilities/uidriverimplemantation');
      screenshotName = await uidriverimplemantation.takeScreenshotOfPage(dateTimeLocal, testParameter);
      screenshotName = `${screenshotName}${dateTimeLocal}`;
      if (strStepStatus === 'pass') {
          let intStepPassed = testconsolidatedreport.stepsPassed;
          intStepPassed = intStepPassed + 1;
          testconsolidatedreport.stepsPassed = intStepPassed;
      } else {
          let intStepFailed = testconsolidatedreport.stepsFailed;
          intStepFailed = intStepFailed + 1;
          testconsolidatedreport.stepsFailed = intStepFailed;
          testconsolidatedreport.failureReason =  testconsolidatedreport.failureReason + '<li name ="failureReason"> <small>'+ strStepDescription+'</small> </li>';
      }
  }
  await updateTestLog(intStepNumber, strStepName, strStepDescription, strStepStatus, dateTimeLocal, screenshotName, testParameter);
  var data = JSON.stringify(testconsolidatedreport);
  const fs = require('fs');
  fs.writeFileSync(testParameter.jsonReport, data, { encoding: 'utf8', flag: 'w' }, () => {
  });
}

export async function reportImageComparison(strExpectedImage, strActualImage, strDifferenceImage, strStepStatus, strDifferenceOputput, testParameter) {
  let testconsolidatedreport = await require('../.' + testParameter.jsonReport);
  let intStepNumber = testconsolidatedreport.stepNumber;
  intStepNumber = intStepNumber + 1;
  testconsolidatedreport.stepNumber = intStepNumber;
  if (strStepStatus === 'pass' || strStepStatus === 'fail') {
      if (strStepStatus === 'pass') {
          let intStepPassed = testconsolidatedreport.stepsPassed;
          intStepPassed = intStepPassed + 1;
          testconsolidatedreport.stepsPassed = intStepPassed;
      } else {
          let intStepFailed = testconsolidatedreport.stepsFailed;
          intStepFailed = intStepFailed + 1;
          testconsolidatedreport.stepsFailed = intStepFailed;
          testconsolidatedreport.failureReason =  testconsolidatedreport.failureReason +'<li name ="failureReason"> <small>'+ strDifferenceOputput+'</small> </li>';
      }
  }
  await updateTestLogImageComparison(intStepNumber, strExpectedImage, strActualImage, strDifferenceImage, strStepStatus, strDifferenceOputput, testParameter);
  var data = JSON.stringify(testconsolidatedreport);
  const fs = require('fs');
  fs.writeFileSync(testParameter.jsonReport, data, { encoding: 'utf8', flag: 'w' }, () => {
  });
}

