import { Box, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '-1px',
    border: '1px solid #766e61',
    padding: '15px'
  },
  photo: {
    borderRadius: '50%',
    width: '120px'
  },
  details: {
    width: '100%'
  },
  fullName: {
    fontSize: '2em',
    fontWeight: '700'
  },
  userName: {
    fontFamily: 'Arial',
    fontWeight: 100,
    color: '#7d7a73'
  },
  msg: {
    fontSize: '1.3em',
    fontWeight: '100',
    whiteSpace: 'pre-line'
  },
  msgForShow: {
    fontSize: '1.9em',
    fontWeight: '100',
    whiteSpace: 'pre-line'
  },
  heart: {
    color: 'red'
  }
}));


const Profile = () => {
  const classes = useStyles();
  const [currentUser] = useContext(CurrentUserContext);

  return (
    <Box>
      { currentUser && 
        <Box display="flex" className={classes.box}>
          <Box m={2} mr={4}>
            {
              <img src={currentUser.photo} alt="User" className={classes.photo}/>
            }       
          </Box>
          <Box className={classes.details}>
            <Typography paragraph className={classes.fullName}>
                {`${currentUser.displayName}`}
            </Typography>
            <Typography paragraph className={classes.userName}>
                {`${currentUser.userName}`}
            </Typography>
          </Box>
        </Box>
      }
    </Box>
  )
}

export default Profile
