import React from 'react';
import renderer from 'react-test-renderer';

import Map from '../../components/map.js';

it('render component scanner', () => {
  const TextInputComponent = renderer.create(<Map />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});
