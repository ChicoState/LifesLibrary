import React from 'react';
import renderer from 'react-test-renderer';
import Scanner from '../../components/scanner.js';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

it('render component scanner', () => {
    const TextInputComponent = renderer.create(<Scanner />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

// it('Testing scanner', async () => {
//   const instanceOf = renderer.create(<Scanner />).getInstance();
//   instanceOf.getBook('0439023521', instanceOf.alertInfo);
//   await expect(instanceOf.state.author).toEqual('Suzanne Collins')
// });
