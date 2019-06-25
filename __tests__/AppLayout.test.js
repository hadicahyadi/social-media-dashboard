import React from 'react';
import { mount, shallow } from 'enzyme';
import AppLayout from '@/components/AppLayout';
import AppHeader from '@/components/AppHeader';
import AppSidebar from '@/components/AppSidebar';
import AppRouter from '@/AppRouter';

describe('AppLayout', () => {
  test('should have div root', () => {
    expect(shallow(<AppLayout />).is('div')).toBe(true);
  });
  test('should have header', () => {
    expect(shallow(<AppLayout />).contains(<AppHeader />)).toBe(true);
  });
  test('should have sidebar', () => {
    expect(shallow(<AppLayout />).contains(<AppSidebar />)).toBe(true);
  });
  test('should have main tag', () => {
    expect(shallow(<AppLayout />).find('main').length).toBe(1);
  });
  test('should have router view', () => {
    expect(shallow(<AppLayout />).contains(<AppRouter />)).toBe(true);
  });
})
