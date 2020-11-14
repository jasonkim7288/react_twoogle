import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontFamily: 'Arial',
    fontWeight: 100,
    color: '#7d7a73'
  }
}));


const IconBox = ({ children, num, handleClick }) => {
  const classes = useStyles();

  return (
    <Box className={classes.icon}>
      <Box component="span" mr={2}>
        <IconButton edge="end" onClick={handleClick}>
          {children}
        </IconButton>
      </Box>
      {num && num}
    </Box>
  );
}

export default IconBox;
