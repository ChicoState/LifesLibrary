import React from 'react';
import renderer from 'react-test-renderer';

import Scanner from '../../components/scanner.js';

it('render component scanner', () => {
  const TextInputComponent = renderer.create(<Scanner />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

test('Add to library basic', async () => {
  const scanner = renderer.create(<Scanner />).getInstance();
  const length = scanner.state.library.length;
  await scanner.setState({
    'author': [
      'John Green',
    ],
    'coverArt': 'http://books.google.com/books/content?id=CmBgswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    'description': 'test is a test',
    'isbn': '9780525555384',
    'title': 'Turtles All the Way Down',
  });
  await scanner.addtolibrary();
  await scanner.load();
  expect(scanner.state.library.length).toBe(1+length);
});

test('Add to library duplicate', async () => {
  const scanner = renderer.create(<Scanner />).getInstance();
  const length = scanner.state.library.length;
  await scanner.setState({
    'author': [
      'John Green',
    ],
    'coverArt': 'http://books.google.com/books/content?id=CmBgswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    'description': 'test is a test',
    'isbn': '9780525555384',
    'title': 'Turtles All the Way Down',
  });
  await scanner.addtolibrary();
  await scanner.load();
  expect(scanner.state.library.length).toBe(1+length);
  await scanner.setState({
    'author': [
      'John Green',
    ],
    'coverArt': 'http://books.google.com/books/content?id=CmBgswEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    'description': 'test is a test',
    'isbn': '9780525555384',
    'title': 'Turtles All the Way Down',
  });
  await scanner.addtolibrary();
  await scanner.load();
  expect(scanner.state.library.length).toBe(1+length);
});

test('Get book basic', async () => {
  const scanner = renderer.create(<Scanner />).getInstance();
  await scanner.getBook('9780525555384');
  expect(scanner.state.book.title).toBe('Turtles All the Way Down');
});

test('Get book bad barcode', async () => {
  const scanner = renderer.create(<Scanner />).getInstance();
  await scanner.getBook('97807');
  expect(scanner.state.book.title).toBe('title');
});

test('Get book characters', async () => {
  const scanner = renderer.create(<Scanner />).getInstance();
  await scanner.getBook('a;sdfhasdkjadvasdase a');
  expect(scanner.state.book.title).toBe('title');
});

test('Load library', async () => {
  const scanner = renderer.create(<Scanner />).getInstance();
  await scanner.load();
  expect(scanner.state.book.title).not.toBe(0);
});

test('Model testing', () => {
  const scanner = renderer.create(<Scanner />).getInstance();
  scanner.showModal();
  expect(scanner.state.show).toBe(true);
  scanner.hideModal();
  expect(scanner.state.show).toBe(false);
  expect(scanner.state.scanned).toBe(false);
});
