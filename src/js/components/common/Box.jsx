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

const AddPost = ({ children, className, ...props }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      bgcolor="background.paper"
      p={2}
      className={[classes.container, className].join(' ')}
      {...props}
    >
      {children}
    </Box>
  );
};

AddPost.defaultProps = {
  className: '',
};

AddPost.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default AddPost;
