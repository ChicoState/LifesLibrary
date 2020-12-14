import React from 'react';
import renderer from 'react-test-renderer';
import Library from '../../components/library.js';

it('render component scanner', () => {
  jest.useFakeTimers();
  const TextInputComponent = renderer.create(<Library />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

test('Tests Sample Function', async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.sample();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.library.length).toBe(3);
});

test('Tests Clear Function', async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.clearlibrary();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.library.length).toBe(0);
});

test('Test title Search', async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.sample();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.search.length).toBe(0);
  await instanceOf.searchLibrary('Hunger');
  expect(instanceOf.state.search.length).toBe(1);
});

test('Test title Search Null', async () => {
  const instanceOf = renderer.create(<Library />).getInstance();
  await instanceOf.sample();
  await instanceOf.componentDidMount();
  expect(instanceOf.state.search.length).toBe(0);
  const temp = null;
  await instanceOf.searchLibrary(temp);
  expect(instanceOf.state.search.length).toBe(0);
});


test('Test Inspect Book functionality', () => {
  const book = {
    isbn: 'isbn',
    author: 'author',
    title: 'title',
    description: 'description',
    coverArt: 'www.google.com',
  };
  const library = renderer.create(<Library />).getInstance();
  library.inspectBook(book);
  expect(library.state.modalVisible).toBe(true);
});
