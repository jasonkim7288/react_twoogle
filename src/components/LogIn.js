import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const useStyles = makeStyles((theme) => ({
  leftSide:  {
    overflow: 'hidden'
  },
  icon: {
    transform: 'translate(-150px, -200px)',
    overflow: 'hidden',
    fontSize: '100vw',
    color: '#31a9f3'
  }
}));

const LogIn = ({ firebase }) => {
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
      
      <Grid container>
        <Grid item xs={6} className={classes.leftSide} alignItems="center">
          <TwitterIcon className={classes.icon}/>
        </Grid>
        <Grid item xs={6}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default LogIn;
