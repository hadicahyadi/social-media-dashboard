import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Home from '@/pages/Home';
import Users from '@/pages/Users';
import Posts from '@/pages/Posts';
import Albums from '@/pages/Albums';

function AppRouter() {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/albums" component={Albums} />
      </Switch>
    </Container>
  )
}

export default AppRouter;