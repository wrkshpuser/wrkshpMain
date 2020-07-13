import * as searchpage_methods from '../../pagemethods/searchpage_methods'

export async function launchAPP(testParameter) {
    await searchpage_methods.launchAPP(testParameter);
}

export async function searchProduct(searchKey, testParameter) {
    await searchpage_methods.entertxt_search(searchKey,testParameter);
    await searchpage_methods.clickbtn_searchIcon(testParameter);
}
