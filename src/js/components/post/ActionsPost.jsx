import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  actionContainer: {
    borderRadius: '0.4rem',
    lineHeight: '2.2rem',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,

    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e2e5ec',
    },
  },
}));

const ActionsPost = ({ postId }) => {
  const classes = useStyles();
  console.log(postId);

  return (
    <Box display="flex" justifyContent="space-between">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="30%"
        className={classes.actionContainer}
      >
        Thích
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="30%"
        className={classes.actionContainer}
      >
        Bình luận
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="30%"
        className={classes.actionContainer}
      >
        Chia sẻ
      </Box>
    </Box>
  );
};

ActionsPost.propTypes = {
  postId: PropTypes.object.isRequired,
};

export default ActionsPost;
