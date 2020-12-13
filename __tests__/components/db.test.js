import React from 'react';
import renderer from 'react-test-renderer';
import Library from '../../components/db.js';

it('render component scanner', () => {
  const TextInputComponent = renderer.create(<Library />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

test('Tests Sample Function', async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.sample();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.library.length).toBe(3);
});

test('Test title Search', async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.sample();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.search.length).toBe(0);
  await instanceOf.searchLibrary('Hunger');
  expect(instanceOf.state.search.length).toBe(1);
});
