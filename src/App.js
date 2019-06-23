import React, { Fragment } from 'react';
import { HashRouter, Link as RouterLink } from 'react-router-dom';

import AppLayout from '@/components/AppLayout';

export default function App() {
  return (
    <HashRouter>
      <Fragment>
        <AppLayout />
      </Fragment>
    </HashRouter>
  )
}
