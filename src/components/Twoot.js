import { Box, IconButton, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { UsersContext } from '../contexts/UsersContext';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '-1px',
    border: '1px solid #766e61',
    padding: '15px'
  },
  photo: {
    borderRadius: '50%',
    width: '53px'
  },
  details: {
    width: '100%'
  },
  fullName: {
    fontSize: '1.3em',
    fontWeight: '700'
  },
  userName: {
    fontFamily: 'Arial',
    fontWeight: 100,
    color: '#7d7a73'
  },
  msg: {
    fontSize: '1.3em',
    fontWeight: '100'
  }
}));

const Twoot = ({ twoot }) => {
  const classes = useStyles();
  const [users, setUsers] = useContext(UsersContext);

  const getUser = (id) => {
    console.log(users.find(user => user.id === id));
    return users.find(user => user.id === id);
  }

  return (
    <div>
      <Box className={classes.box} >
        <Box display="flex">
          <Box mr={2}>
          {
            <img src={getUser(twoot.userId).photo} alt="photo" className={classes.photo}/>
          }
          </Box>
          <Box className={classes.details}>
            <Typography paragraph className={classes.fullName}>
              <Box component="span" mr={1}>
                {`${getUser(twoot.userId).firstName} ${getUser(twoot.userId).lastName}`}
              </Box>
              <Box component="span" className={classes.userName}>
                {`${getUser(twoot.userId).userName}`}
              </Box>
            </Typography>
            <Typography paragraph className={classes.msg}>
              {`${twoot.msg}`}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Box className={classes.userName}>
                <Box component="span" mr={2}>
                  <IconButton edge="end">
                    <ChatBubbleOutlineIcon  className={classes.userName}/>
                  </IconButton>
                </Box>
                {3}
              </Box>
              <Box className={classes.userName}>
                <Box component="span" mr={2}>
                  <IconButton edge="end">
                    <FavoriteBorderSharpIcon  className={classes.userName}/>
                  </IconButton>
                </Box>
                {3}
              </Box>
              <Box className={classes.userName}>
                <Box component="span" mr={2}>
                  <IconButton edge="end">
                    <FileCopyIcon  className={classes.userName}/>
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Twoot
