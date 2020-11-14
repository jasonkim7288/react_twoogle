import { Box, IconButton, Paper, Snackbar, Typography } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { UsersContext } from '../contexts/UsersContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconBox from './IconBox';
import LinkBox from './LinkBox';
import AlertDialog from './AlertDialog';
import MuiAlert from '@material-ui/lab/Alert';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const Twoot = ({ twootId, fireDb, linkNeeded, history }) => {
  const classes = useStyles();
  const [users, ] = useContext(UsersContext);
  const [currentUser, ] = useContext(CurrentUserContext)
  const [twoot, setTwoot] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  console.log('users:', users);

  useEffect(() => {
    fireDb.ref('twoots/' + twootId)
    .once('value', snapshot => {
      console.log('twoot snapshot.val():', snapshot.val());
      setTwoot(snapshot.val());
      console.log('users:', users);
    })
  }, []);

  const getUser = (id) => {
    console.log('id:', id);
    return users[id];
  }

  const handleEdit = () => {
    console.log('handleEdit');
    history.push(`/twoots/${twootId}/edit`);
  }

  const handleDelete = () => {
    setOpen(true);
  }

  const handleDeleteOk = () => {
    fireDb.ref('twoots/' + twootId).remove();
    history.push('/')
  }

  const handleClipboard = () => {
    navigator.clipboard.writeText(twoot.msg);
    setOpenSnackbar(true);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  return (
    <Box className={classes.box} >
      <h1>{openSnackbar}</h1>
      {twoot && users &&
        <Box display="flex">
          <LinkBox twootId={twootId} linkNeeded={linkNeeded}>
            <Box mr={2}>
            {
              <img src={getUser(twoot.userId).photo} alt="photo" className={classes.photo}/>
            }
            </Box>
          </LinkBox>
          <Box className={classes.details}>
            <LinkBox twootId={twootId} linkNeeded={linkNeeded}>
              <Typography paragraph className={classes.fullName}>
                <Box component="span" mr={1}>
                  {`${getUser(twoot.userId).displayName}`}
                </Box>
                <Box component="span" className={classes.userName}>
                  {`${getUser(twoot.userId).userName}`}
                </Box>
              </Typography>
              <Typography paragraph className={classes.msg}>
                {`${twoot.msg}`}
              </Typography>
            </LinkBox>
            <Box display="flex" justifyContent="space-between">
              <IconBox num={3} tooltipTitle="Comment">
                <ChatBubbleOutlineIcon  className={classes.userName}/>
              </IconBox>
              <IconBox num={3} tooltipTitle="Like">
                <FavoriteBorderSharpIcon  className={classes.userName}/>
              </IconBox>
              <IconBox handleClick={handleClipboard} tooltipTitle="Copy message to clipboard">
                <FileCopyIcon className={classes.userName} />
              </IconBox>
              { currentUser && currentUser.id === twoot.userId &&
                  <IconBox handleClick={handleEdit} tooltipTitle="Edit">
                    <EditIcon className={classes.userName}  />
                  </IconBox>
              }
              { currentUser && currentUser.id === twoot.userId &&
                  <IconBox handleClick={handleDelete} tooltipTitle="Delete">
                    <DeleteOutlineIcon className={classes.userName} />
                  </IconBox>
              }
              </Box>
          </Box>
        </Box>
      }
      <AlertDialog open={open} setOpen={setOpen} handleOk={handleDeleteOk} />
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Twoot
