import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navLink: {
    textDecoration: 'none',
    color: theme.palette.common.black
  },
  activeNav: {
    backgroundColor: theme.palette.action.selected
  }
}));

function AppNavLink({ icon, text, to }) {
  const classes = useStyles();
  const [ selectedList, setSelectedList ] = React.useState(false);

  const checkIsActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if(!location) return false;
    
    const {pathname} = location;
    if (pathname == to) {
      setSelectedList(true);
      return true;
    } else {
      setSelectedList(false);
      return false;
    }
  }


  return (
    <NavLink className={classes.navLink} to={to} isActive={checkIsActive} activeClassName={classes.activeNav}>
      <ListItem button selected={selectedList}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </NavLink>
  )
}

export default AppNavLink;
