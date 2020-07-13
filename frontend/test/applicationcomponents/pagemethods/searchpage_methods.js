import * as searchpage_locators from '../pageobjects/searchpage_locators'
import * as uifactory from '../../utilities/uidriverimplemantation'

export async function launchAPP(testParameter) {
    let url = process.env.url;
    console.log(url);
    await uifactory.launchUrl(testParameter, url);
 }
export async function entertxt_search(value, testParameter) {
    let object = searchpage_locators.elements.txt_search;
    await uifactory.enterText(object, value, testParameter);
}
export async function clickbtn_searchIcon(testParameter) {
    let object = searchpage_locators.elements.btn_searchIcon;
    await uifactory.click(object, testParameter);
}