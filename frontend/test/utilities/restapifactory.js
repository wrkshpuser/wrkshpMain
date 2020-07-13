import request from 'superagent';
import * as reportfactory from '../utilities/reportfactory'
import * as webdriverfactory from '../utilities/webdriverfactory'

export async function doGetAPI(strEndpoint, strExpectedStatuscode, testParameter) {
    const response = await request
        .get(`${strEndpoint}`)
        .set('accept', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest');

    if (!(strExpectedStatuscode == response.status)) {
        await reportfactory.reportApi('GET: ' + strEndpoint, JSON.stringify(response.body), 'Expected Status Code: ' + strExpectedStatuscode + ' should be displayed but actual Status Code is ' + response.status, 'fail', testParameter);
    }
    return response;
}

export async function doPutAPI(endPoint, payLoad) {
    const response = await request
        .put(`${endPoint}`)
        .send(payLoad)
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest');
    return response;
}

export async function doPostAPI(strEndpoint, strPayLoad, strExpectedStatuscode, testParameter) {
    const response = await request
        .post(`${strEndpoint}`)
        .send(strPayLoad)
        .set('content-type', 'application/json')
        .set('accept', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest');
    if (!(strExpectedStatuscode == response.status)) {
        await reportfactory.reportApi('POST: Endpoint - ' + strEndpoint +' Request - '+JSON.stringify(strPayLoad), JSON.stringify(response.body), 'Expected Status Code: ' + strExpectedStatuscode + ' should be displayed but actual Status Code is ' + response.status, 'fail', testParameter);
    }
    return response;
}

export async function doPostAPI_After_JSONConvertToXML(endPoint, payLoad) {
    var jsonxml = require('jsontoxml');
    var xml = jsonxml(payLoad);
    console.log(xml);
    const response = await request
        .post(`${endPoint}`)
        .send(xml)
        .set('content-type', 'application/xml')
        .set('accept', 'application/json')
        .set('X-Requested-With', 'XMLHttpRequest');
    return response;
}

