import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    fontFamily: 'Arial',
    fontWeight: 100,
    color: '#7d7a73'
  }
}));

const IconBox = ({ children, num, handleClick, tooltipTitle }) => {
  const classes = useStyles();

  return (
    <Box className={classes.icon}>
      <Box component="span" mr={2}>
        <Tooltip title={tooltipTitle} placement="left">
          <IconButton edge="end" onClick={handleClick}>
            {children}
          </IconButton>
        </Tooltip>
      </Box>
      {num && num}
    </Box>
  );
}

export default IconBox;
