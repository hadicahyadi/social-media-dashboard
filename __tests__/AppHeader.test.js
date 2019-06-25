import React from 'react';

import { mount, shallow } from 'enzyme';

import AppHeader from '@/components/AppHeader';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

describe('AppHeader', () => {
  test('should render correctly', () => {
    const header = shallow(<AppHeader />);
    expect(header.find(AppBar)
      .find(Toolbar)
      .find(Typography)
      .length)
      .toBe(1);
  });
})
