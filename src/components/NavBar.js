import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import TwitterIcon from '@material-ui/icons/Twitter';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
}));


const menuList = [
  {
    to: '/',
    title: 'Home',
    icon: <HomeIcon />
  },
  {
    to: '/',
    title: 'Profile',
    icon: <PersonIcon />
  },
  {
    to: '/twoots/new',
    title: 'Twoogle',
    icon: <TwitterIcon />
  }
]

const NavBar = ({ window, firebase }) => {
  const classes = useStyles();

  const handleLogOut = () => {
    firebase.auth().signOut();
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuList.map((menu, index) => (
          <Link to={menu.to} key={menu.title}>
            <ListItem button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItem>
          </Link>
        ))}
        <ListItem button onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default NavBar
