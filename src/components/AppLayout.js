import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppRouter from '@/AppRouter';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(2)
  },
}));

function AppLayout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppHeader />
      <AppSidebar />
      <main className={classes.content}>
        <AppRouter />
      </main>
    </div>
  )
}

export default AppLayout;
