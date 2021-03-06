import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, IconButton, TextField } from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { useGlobalState } from '../config/globalState';

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
  btn: {
    background: '#0b76b8'
  },
  icons: {
    color: '#0b76b8'
  }
}));

const NewTwoot = ({history, twootId, isComment}) => {
  const { state, fireDb } = useGlobalState();
  const { currentUser } = state;
  const classes = useStyles();
  const inputMsg = useRef();
  const [msg, setMsg] = useState('');
  const [msgError, setMsgError] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isComment) {
      fireDb.ref('twoots/' + twootId).transaction(twootFromDb => {
        if (twootFromDb) {
          twootFromDb.commentCount++;
          const newComment = {
            userId: currentUser.id,
            msg: inputMsg.current.value,
            likeCount: 0,
            commentCount: 0,
            createdAt: (new Date()).toString()
          };
          const newCommentKey = fireDb.ref('twoots/' + twootId + '/comments/').push().key;
          if (!twootFromDb.comments) {
            twootFromDb.comments = {};
          }
          twootFromDb.comments[newCommentKey] = newComment;
        }
        history.push(`/twoots/${twootId}`);
        return twootFromDb;
      });
    } else if (twootId) {
      fireDb.ref('twoots/' + twootId).transaction(twoot => {
        if (twoot) {
          twoot.msg = msg;
        }
        history.push(`/twoots/${twootId}`);
        return twoot;
      });
    } else {
      const newTwoot = {
        userId: currentUser.id,
        msg: inputMsg.current.value,
        likeCount: 0,
        commentCount: 0,
        createdAt: (new Date()).toString(),
      };

      const newTwootKey = fireDb.ref('twoots/').push().key;
      let updates = {};
      updates['/twoots/' + newTwootKey] = newTwoot;
      // updates['/users/' + currentUser.id + '/' + newTwootKey] = newTwoot;
      fireDb.ref().update(updates);
      history.push(`/twoots/${newTwootKey}`);
    }
  }

  const verifyMsg = (strMsg) => {
    if (strMsg.length < 3 || strMsg.length > 1000) {
      setMsgError('Twoogle message should be more than 2 letters and less then 1000 letters');
    } else {
      setMsgError(null);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setMsg(value);
    verifyMsg(value);
  }

  const handleSelectEmoji = (emoji) => {
    console.log('inputMsg.current.selectionStart:', inputMsg.current.selectionStart);
    let value = inputMsg.current.value;
    value = value.slice(0, inputMsg.current.selectionStart) + emoji.native + value.slice(inputMsg.current.selectionStart);
    setMsg(value);
    verifyMsg(value);
    setShowPicker(false);
  }

  const handleClickEmoji = () => {
    setShowPicker(true);
  }

  useEffect(() => {
    if (isComment) {

    } else if (twootId) {
      fireDb.ref('twoots/' + twootId)
        .once('value')
        .then(snapshot => {
          console.log('edit twoot snapshot.val():', snapshot.val());
          setMsg(snapshot.val().msg);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      {currentUser &&
        <Box className={classes.box} >
          <Box display="flex">
            <Box mr={2}>
            {
              <img src={currentUser.photo} alt="current user" className={classes.photo}/>
            }
            </Box>
            <Box className={classes.details}>
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <TextField
                    inputRef={inputMsg}
                    name="msg"
                    error={msgError ? true : false}
                    helperText={msgError}
                    fullWidth={true}
                    multiline
                    autoFocus
                    onChange={handleChange}
                    value={msg}
                  />
                </Box>
                <Box component="span" mr={20} className={classes.icons}>
                  <IconButton edge="end" color="inherit" onClick={handleClickEmoji}>
                    <SentimentSatisfiedIcon />
                  </IconButton>
                </Box>
                <Button variant="contained" color="primary" type="submit" className={classes.btn} disabled={(msgError || !inputMsg.current || !inputMsg.current.value) ? true : false}>{isComment ? 'Comment' : 'Twoogle'}</Button>
                <Box>
                  { showPicker &&
                    <Picker set="twitter" theme="dark" onSelect={handleSelectEmoji} />
                  }
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      }
    </Box>
  )
}

export default NewTwoot
