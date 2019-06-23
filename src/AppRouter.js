import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Home from '@/pages/Home';
import Users from '@/pages/Users';
import Posts from '@/pages/Posts';
import PostDetail from '@/pages/PostDetail';
import Albums from '@/pages/Albums';

function AppRouter() {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/:id" component={PostDetail} />
        <Route path="/albums" component={Albums} />
      </Switch>
    </Container>
  )
}

export default AppRouter;
