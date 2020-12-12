import React from 'react';
import renderer from 'react-test-renderer';

import Scanner from '../../components/scanner.js';

it('render component scanner', () => {
    const TextInputComponent = renderer.create(<Scanner />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});
