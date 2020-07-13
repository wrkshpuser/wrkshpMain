import React from "react";
import Search from './Search';
//import ProductListWidget from '../../containers/plp/ProductListWidget';
import '@babel/polyfill';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import * as reportfactory from '../../../test/utilities/reportfactory'
configure({adapter: new Adapter()});


let testcaseName = 'Should Display Search Input Box';
let testdescription = 'Verify whether Search Input Box Is Displayed';
test(testcaseName, async () => {
    let testParameter = await reportfactory.createTestReport(testcaseName, 'unitTest', testdescription);
    try{
    const wrapper = shallow(<Search />);
    const element = wrapper.find('#productsearch')
    let booleanPresence = await element.exists();
    if(booleanPresence){
        await reportfactory.reportApi("Search Inputbox Should Be Displayed", "Search Inputbox is Displayed", '', 'pass', testParameter);
    }else{
        await reportfactory.reportApi("Search Inputbox Should Be Displayed", "Search Inputbox is Not Displayed", '', 'fail', testParameter);
    }
    await expect(booleanPresence).toBe(true);
}
finally {
    await reportfactory.endTestReport(testParameter);
  }
 /*   firstanme.simulate('click');
    firstanme.value = 'Hello';
    firstanme.simulate('change');
    let textReceived = firstanme.value;
    expect(textReceived).toBe('Hello');*/
})


let testcaseName1 = 'Should Accept Search Input Text';
let testdescription1 = 'Verify whether Search Input Text is Accepted';
test(testcaseName, async () => {
    let testParameter = await reportfactory.createTestReport(testcaseName1, 'unitTest', testdescription1);
    try{
        const seachKey = 'Jeans';
        const wrapper = shallow(<Search />);
        const element = wrapper.find('#productsearch')
        expect(element.exists()).toBe(true);
        element.simulate('click');
        element.value = seachKey;
        let textReceived = await element.value;
        if(textReceived===seachKey){
            await reportfactory.reportApi("Search Inputbox Should Be Entered With Value :"+seachKey, "Search Inputbox is Entered With Value :"+seachKey, '', 'pass', testParameter);
        }else{
            await reportfactory.reportApi("Search Inputbox Should Be Entered With Value :"+seachKey, "Search Inputbox is Not Entered With Value :"+seachKey, '', 'fail', testParameter);
        }
        expect(textReceived).toBe(seachKey);
        const elementSearchicon = wrapper.find('#searchicon')
        elementSearchicon.simulate('click');
        //const wrapperPLP = shallow(<ProductListWidget />);
        //const elementPLP = wrapperPLP.find('#plp_page');
       // expect(elementPLP.exists()).toBe(true);
    }finally {
        await reportfactory.endTestReport(testParameter);
      }
    
})