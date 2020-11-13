import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const useStyles = makeStyles((theme) => ({
  leftSide: {
    overflow: 'hidden',
    height: '100vh'
  },
  icon: {
    transform: 'translate(-150px, -200px)',
    overflow: 'hidden',
    fontSize: '100vw',
    color: '#31a9f3'
  },
  rightSide: {
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    color: 'white'
  }
}));

const LogIn = ({firebase}) => {
  const classes = useStyles();

  const uiConfig = {
    signInFlow: 'popupt',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  return (
    <Box>
      <Typography />

      <Grid container alignItems="center">
        <Grid item xs={6} className={classes.leftSide} >
          <TwitterIcon className={classes.icon}/>
        </Grid>
        <Grid item xs={6} className={classes.rightSide}>

          <Typography variant="h3" align="center" className={classes.title}>Twoogle</Typography>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default LogIn;
