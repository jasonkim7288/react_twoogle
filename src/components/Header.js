import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@material-ui/core'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap align="center">
          Wanna Twoogle?
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
