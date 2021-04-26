import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import NewMessage from './NewMessage';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
  newMessageButton: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#fff',
    marginRight: 30,
    marginBottom: 30,
  },
}));

const Message = () => {
  const classes = useStyles();
  const [openNewMessage, setOpenNewMessage] = useState(true);

  const handleOpenNewMessage = () => {
    setOpenNewMessage(!openNewMessage);
  };

  const handleCloseNewMessage = () => {
    setOpenNewMessage(false);
  };

  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="flex-end">
        {openNewMessage && (
          <Box mr={3}>
            <NewMessage handleClose={handleCloseNewMessage} />
          </Box>
        )}

        <Box display="flex" flexDirection="column">
          <Tooltip title="Tin nhắn mới" placement="left">
            <IconButton className={classes.newMessageButton} onClick={handleOpenNewMessage}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </div>
  );
};

export default Message;
