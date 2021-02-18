import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '0.5rem',
    boxShadow: theme.shadows[1],
  },
}));

const AddPost = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="background.paper"
      p={2}
      className={classes.container}
      {...props}
    >
      {children}
    </Box>
  );
};

AddPost.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AddPost;
