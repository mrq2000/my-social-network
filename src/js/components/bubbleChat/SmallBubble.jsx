import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

import useUserInfo from '../../queries/useUserInfo';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  friendAvatar: {
    height: '3rem',
    width: '3rem',
    objectFit: 'cover',
    cursor: 'pointer',

    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },
  removeIconContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '1px',
    cursor: 'pointer',

    borderRadius: '100%',
    backgroundColor: 'pink',
  },
  fontCloseIcon: {
    fontSize: '16px',
  },
}));

const SmallBubble = ({ handleClose, handleAddUserChatting, userId }) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState(false);

  const { data: userInfo } = useUserInfo(userId);

  return (
    <Box
      className={classes.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <Box onClick={() => handleClose(userId)} display="flex" justifyContent="center" alignItems="center" className={classes.removeIconContainer}>
          <CloseIcon className={classes.fontCloseIcon} />
        </Box>
      )}

      <Box display="flex" onClick={() => handleAddUserChatting(userId)}>
        {
          userInfo
            ? <img src={userInfo.avatar_name} alt="avatar" className={classes.friendAvatar} />
            : <Box className={classes.friendAvatar} />
        }
      </Box>
    </Box>
  );
};

SmallBubble.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAddUserChatting: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SmallBubble;
