import React, { Fragment } from 'react';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

import AppLayout from '@/containers/AppLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <AppLayout />
      </Fragment>
    </BrowserRouter>
  )
}
