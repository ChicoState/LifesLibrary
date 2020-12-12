import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

it('render component scanner', () => {
    const TextInputComponent = renderer.create(<App />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});
