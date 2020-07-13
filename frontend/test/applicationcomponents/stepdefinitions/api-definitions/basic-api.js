import * as restapifactory from '../../../utilities/restapifactory'


export async function getAPIValidateStatus(strEndpoint, strExpectedStatuscode, testParameter) {
    let response = await restapifactory.doGetAPI(strEndpoint, strExpectedStatuscode, testParameter);
}