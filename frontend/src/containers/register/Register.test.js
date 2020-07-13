import React from "react";
import Register from './Register';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
test('Should display first name',() =>{
    const wrapper = shallow(<Register />);
    const firstanme = wrapper.find('#firstname')
    expect(firstanme.exists()).toBe(true);
    firstanme.simulate('click');
    firstanme.value = 'Hello';
    let textReceived = firstanme.value;
    expect(textReceived).toBe('Hello');
})

test('Should display last name',() =>{
    const wrapper = shallow(<Register />);
    const firstanme = wrapper.find('#lastname')
    expect(firstanme.exists()).toBe(true);
})


test('Should display Email',() =>{
    const wrapper = shallow(<Register />);
    const firstanme = wrapper.find('#registeremail')
    expect(firstanme.exists()).toBe(true);
})

test('Should display Password',() =>{
    const wrapper = shallow(<Register />);
    const firstanme = wrapper.find('#password')
    expect(firstanme.exists()).toBe(true);
})

it('Should display Confirm Password',() =>{
    const wrapper = shallow(<Register />);
    const firstanme = wrapper.find('#confirmpassword')
    expect(firstanme.exists()).toBe(true);
})