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
        <Link underline="none" color="inherit" component={RouterLink} to="/">
          <ListItem button
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}>
            <ListItemIcon>
              <Icon>home</Icon>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link underline="none" color="inherit" component={RouterLink} to="/users">
          <ListItem button
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}>
            <ListItemIcon>
              <Icon>group</Icon>
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link underline="none" color="inherit" component={RouterLink} to="/posts">
          <ListItem button
            selected={selectedIndex === 3}
            onClick={event => handleListItemClick(event, 3)}>
            <ListItemIcon>
              <Icon>list</Icon>
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </ListItem>
        </Link>
        <Link underline="none" color="inherit" component={RouterLink} to="/albums">
          <ListItem button
            selected={selectedIndex === 4}
            onClick={event => handleListItemClick(event, 4)}>
            <ListItemIcon>
              <Icon>collections</Icon>
            </ListItemIcon>
            <ListItemText primary="Albums" />
          </ListItem>
        </Link>
      </List>
    </Drawer>
  )
}

export default AppSidebar;
