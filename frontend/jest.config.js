// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const app = require('./test/applicationconfiguration.json');
const fs = require('fs');
const currentdate = new Date();
const startTime = `${currentdate.getDate()}_${(currentdate.getMonth() + 1)}_${currentdate.getFullYear()}_${currentdate.getHours()}_${currentdate.getMinutes()}_${currentdate.getSeconds()}`
const datetime = `RUN_${startTime}`;
const dir = './test/results';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const dirRS = `./test/results/${datetime}`;
if (!fs.existsSync(dirRS)) {
  fs.mkdirSync(dirRS);
}
const dirScreenshot = `${dirRS}/screenshots`;
if (!fs.existsSync(dirScreenshot)) {
  fs.mkdirSync(dirScreenshot);
}
const dirJson = `${dirRS}/json`;
if (!fs.existsSync(dirJson)) {
  fs.mkdirSync(dirJson);
}
const argv = require('minimist')(process.argv.slice(2));
let browser = argv.browser || 'chromium';
let tool = argv.tool || app.uitool;
let url = argv.url || app.site_url;
let country = argv.location || app.location;
let locale = argv.locale || app.locales;

process.env.reportFolderName = datetime;
process.env.reportpath = dirRS;
process.env.browser = browser;
process.env.tool = tool;
process.env.url = url;
process.env.country = country;
process.env.locale = locale;
//process.env.CHROME_PATH="C://Program Files (x86)//Google//Chrome//Application//chrome_proxy.exe";


createBaseSummaryReportHTML();


async function createBaseSummaryReportHTML() {
  const fse = require('fs-extra')
  fse.copySync('./test/utilities/report-libs/template/reportlibs', `${dirRS}//reportlibs`);
  const fsw = require('fs');
  const rawdataNew = fsw.readFileSync('./test/utilities/report-libs/template/SummaryReport.txt');
  let resultBS = rawdataNew.toString();
   resultBS = resultBS.replace('#{Environment}', app.site_url);
  resultBS = resultBS.replace('#{StartTime}', currentdate);
  resultBS = resultBS.replace('#{Concurrency}', 5);
  fsw.writeFileSync(`${dirRS}//Summary.html`, resultBS, 'utf8', () => {
  });
  await waitforfile(`${dirRS}//Summary.html`);
}

async function waitforfile(filepath){
  var waitOn = require('wait-on');
var opts = {
  resources: [
    filepath,
  ],
  interval: 1000, // poll interval in ms, default 250ms
  timeout: 10000, // timeout in ms, default Infinity
 
 
};
try {
  await waitOn(opts);
  // once here, all resources are available
} catch (err) {
 // console.log(err);
}

}
module.exports = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // Respect "browser" field in package.json when resolving modules
  // browser: false,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\303236\\AppData\\Local\\Temp\\jest",
  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: null,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom:  ['src/**/*.{js,jsx,mjs}'],

  // The directory where Jest should output its coverage files
  ///"+process.env.reportFolderName+"
  coverageDirectory: "test/results/coverage",

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // A list of reporter names that Jest uses when writing coverage reports
   coverageReporters: [
  //   "json",
  //   "text"
        "lcov",
       "clover"
  ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    "global": {  // global thresholds
      "branches": 1,
      "functions": 1,
      "lines": 1,
      "statements": 1
    },
   /* "./src/App.js": {  // file level thresholds
      "lines": 100
    } */
  },

  // A path to a custom dependency extractor
  // dependencyExtractor: null,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: null,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: null,

  // Run tests from one or more projects
  // projects: null,

  // Use this configuration option to add custom reporters to Jest
  "reporters":  [ "default", ["jest-junit", { outputDirectory: "test/results" , "outputName": "junit.xml"} ] ],

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: null,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: null,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  // testMatch: [
    testMatch: [
      "**/*.test.js"
  ],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: null,

  // This option allows use of a custom test runner
  // testRunner: "jasmine2",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
   //timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: null,

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: null,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
   watchman: true,
};
