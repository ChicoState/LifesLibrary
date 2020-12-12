import React from 'react';
import renderer from 'react-test-renderer';

import Lib from '../../components/db.js';

it('render component scanner', () => {
    const TextInputComponent = renderer.create(<Lib />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});
