import React from 'react';
import renderer from 'react-test-renderer';
import Scanner from '../../components/scanner.js';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
<<<<<<< HEAD

Enzyme.configure({ adapter: new Adapter() })
=======
>>>>>>> c04c2eb298305a40dff152e7f5f3688479243716

it('render component scanner', () => {
    const TextInputComponent = renderer.create(<Scanner />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

<<<<<<< HEAD
// it('Testing scanner', async () => {
//   const instanceOf = renderer.create(<Scanner />).getInstance();
//   instanceOf.getBook('0439023521', instanceOf.alertInfo);
//   await expect(instanceOf.state.author).toEqual('Suzanne Collins')
// });
=======
test('Tests Sample Function',  async () => {
  const instanceOf = renderer.create(<Scanner />).getInstance();
  await instanceOf.getBook('0439023521', instanceOf.alertInfo);
  expect(instanceOf.state.library.author).toBe('Suzanne Collins')
})
>>>>>>> c04c2eb298305a40dff152e7f5f3688479243716
