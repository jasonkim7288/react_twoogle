import { Box, Snackbar, Typography } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { UsersContext } from '../contexts/UsersContext';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props}/>;
}

const Twoot = ({ twootId, fireDb, linkNeeded, history }) => {
  const classes = useStyles();
  const [users] = useContext(UsersContext);
  const [currentUser] = useContext(CurrentUserContext)
  const [twoot, setTwoot] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);


  console.log('users:', users);
  console.log('twootId:', twootId);
  console.log('twoot:', twoot);

  useEffect(() => {
    fireDb.ref('twoots/' + twootId)
    .once('value', snapshot => {
      console.log('twoot snapshot.val():', snapshot.val());
      setTwoot(snapshot.val());
      console.log('users:', users);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleCommentDelete = (commentKey) => {
    fireDb.ref('twoots/' + twootId).transaction(twootFromDb => {
      if (twootFromDb && twootFromDb.comments) {
        delete twootFromDb.comments[commentKey];
        twootFromDb.commentCount--;
        setTwoot(twootFromDb);
      }
      console.log('twootFromDb:', twootFromDb);
      return twootFromDb;
    });
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

  const handleLike = () => {
    fireDb.ref('twoots/' + twootId).transaction(twootFromDb => {
      if (twootFromDb) {
        if (twootFromDb.likes && twootFromDb.likes[currentUser.id]) {
          twootFromDb.likeCount--;
          twootFromDb.likes[currentUser.id] = null;
        } else {
          twootFromDb.likeCount++;
          if (!twootFromDb.likes) {
            twootFromDb.likes = {};
          }
          twootFromDb.likes[currentUser.id] = true;
        }
        setTwoot(twootFromDb);
      }
      console.log('twootFromDb:', twootFromDb);
      return twootFromDb;
    });
  }

  const handleCommentLike = (commentKey) => {
    fireDb.ref('twoots/' + twootId).transaction(twootFromDb => {
      if (twootFromDb && twootFromDb.comments) {
        let comment = twootFromDb.comments[commentKey];
        if (comment.likes && comment.likes[currentUser.id]) {
          comment.likeCount--;
          comment.likes[currentUser.id] = null;
        } else {
          comment.likeCount++;
          if (!comment.likes) {
            comment.likes = {};
          }
          comment.likes[currentUser.id] = true;
        }
        setTwoot(twootFromDb);
      }
      console.log('twootFromDb:', twootFromDb);
      return twootFromDb;
    });
  }

  const handleComment = () => {
    history.push(`/twoots/${twootId}/comments/new`);
  }

  return (
    <Box >
      {twoot && users && currentUser &&
        <Box display="flex" className={classes.box}>
          <LinkBox twootId={twootId} linkNeeded={linkNeeded}>
            <Box mr={2}>
            {
              <img src={getUser(twoot.userId).photo} alt="User" className={classes.photo}/>
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
              <Typography paragraph className={linkNeeded ? classes.msg : classes.msgForShow}>
                {`${twoot.msg}`}
              </Typography>
            </LinkBox>
            <Box display="flex" justifyContent="space-between">
              <IconBox num={twoot.commentCount} handleClick={handleComment} tooltipTitle="Comment">
                <ChatBubbleOutlineIcon  className={classes.userName}/>
              </IconBox>
              <IconBox num={twoot.likeCount} handleClick={handleLike} tooltipTitle="Like">
                {
                  (twoot.likes && twoot.likes[currentUser.id] === true) ?
                    <FavoriteIcon className={classes.heart}/> :
                    <FavoriteBorderSharpIcon  className={classes.userName}/>
                }
              </IconBox>
              <IconBox handleClick={handleClipboard} tooltipTitle="Copy message to clipboard">
                <FileCopyIcon className={classes.userName} />
              </IconBox>
              { currentUser.id === twoot.userId &&
                  <IconBox handleClick={handleEdit} tooltipTitle="Edit">
                    <EditIcon className={classes.userName}  />
                  </IconBox>
              }
              { currentUser.id === twoot.userId &&
                  <IconBox handleClick={handleDelete} tooltipTitle="Delete">
                    <DeleteOutlineIcon className={classes.userName} />
                  </IconBox>
              }
              </Box>
          </Box>
        </Box>
      }
      { !linkNeeded && twoot && users && currentUser && twoot.comments &&
        Object.keys(twoot.comments).reverse().map(commentKey =>
          <Box display="flex" className={classes.box} ml={2} key={commentKey}>
            <Box mr={2}>
              <img src={getUser(twoot.comments[commentKey].userId).photo} alt="User" className={classes.photo}/>
            </Box>
            <Box className={classes.details}>
              <Typography paragraph className={classes.fullName}>
                <Box component="span" mr={1}>
                  {`${getUser(twoot.comments[commentKey].userId).displayName}`}
                </Box>
                <Box component="span" className={classes.userName}>
                  {`${getUser(twoot.comments[commentKey].userId).userName}`}
                </Box>
              </Typography>
              <Typography paragraph className={classes.userName}>
                Replying to {getUser(twoot.userId).userName}
              </Typography>
              <Typography paragraph className={classes.msg}>
                {`${twoot.comments[commentKey].msg}`}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <IconBox num={twoot.comments[commentKey].likeCount} handleClick={() => handleCommentLike(commentKey)} tooltipTitle="Like">
                  {
                    (twoot.comments[commentKey].likes && twoot.comments[commentKey].likes[currentUser.id] === true) ?
                      <FavoriteIcon className={classes.heart}/> :
                      <FavoriteBorderSharpIcon  className={classes.userName}/>
                  }
                </IconBox>
                { currentUser.id === twoot.comments[commentKey].userId &&
                  <IconBox handleClick={() => handleCommentDelete(commentKey)} tooltipTitle="Delete">
                    <DeleteOutlineIcon className={classes.userName} />
                  </IconBox>
              }
              </Box>
            </Box>
          </Box>
        )
      }
      <AlertDialog open={open} setOpen={setOpen} handleOk={handleDeleteOk} />
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Twoot
