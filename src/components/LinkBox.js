import { Box } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';

const LinkBox = ({ children, twootId, linkNeeded }) => {
  return linkNeeded ? (
      <Link to={`/twoots/${twootId}`}>
        {children}
      </Link>
    ) : (
      <Box>
        {children}
      </Box>
    );
}

export default LinkBox
