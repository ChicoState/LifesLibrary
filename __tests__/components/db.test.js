import React from 'react';
import renderer from 'react-test-renderer';
import Library from '../../components/db.js';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

it('render component Library', () => {
    const TextInputComponent = renderer.create(<Library />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('Tests Sample Function',  async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.sample();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.library.length).toBe(3)
})

test('Test title Search',  async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.sample();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.search.length).toBe(0);
  await instanceOf.searchLibrary("Hunger");
  expect(instanceOf.state.search.length).toBe(1);
})
