import faker from 'faker';

export async function getFakedtTestData(zip, cc, {
  address1 = '', address2 = '', city = '', state = '',
} = {}) {
  return {
    firstName: faker.name.firstName().slice(0, 20),
    lastName: faker.name.lastName().slice(0, 20),
    email: `${faker.internet.email().split('@')[0].slice(0, 20).toLowerCase()}@test.nomail.com`,
    phone: faker.phone,
    password: 'Test12345',
    title: faker.name.prefix().replace('.',''),
    zip,
    address1,
    address2,
    city,
    state,
    cc,
  };
}
export async function getFakedtData() {
  
  let countryData = await getCommonData();
  //return queryOutput;
  faker.locale =  countryData[0].faker_Locale;
  return {
    firstName: faker.name.firstName().slice(0, 20),
    lastName: faker.name.lastName().slice(0, 20),
    email: `${faker.internet.email().split('@')[0].slice(0, 20).toLowerCase()}@test.nomail.com`,
    password: 'Test12345',
    countryData
  };
}

export async function getCommonData(){
  let country = process.env.country;
  let locale = process.env.locale;
  const fs = require('fs');
  //&& @.Locale=="'+locale+'"
  let strQuery = '$..[?(@.Country=="'+country+'")]';
  const app = require('../applicationcomponents/testdata/commondata.json');
  const rawdata = JSON.stringify(app);
  const jsonData = JSON.parse(rawdata);
  const jp = require('jsonpath');
  console.log(strQuery);
  const queryOutput = jp.query(jsonData, strQuery);
  console.log(queryOutput);
  return queryOutput;
}

