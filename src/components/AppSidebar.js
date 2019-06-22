import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';

import AppNavLink from '@/components/AppNavLink';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
}));

function AppSidebar() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}>
      <div className={classes.toolbar} />
      <List>
        <AppNavLink to="/" icon="home" text="Home" />
        <AppNavLink to="/users" icon="group" text="Users" />
        <AppNavLink to="/posts" icon="list" text="Posts" />
        <AppNavLink to="/albums" icon="collections" text="Albums" />
      </List>
    </Drawer>
  )
}

export default AppSidebar;
