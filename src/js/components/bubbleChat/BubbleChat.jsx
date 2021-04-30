import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import NewMessage from './NewMessage';
import ChattingBox from './ChattingBox';

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
  const [userChattingIds, setUserChatting] = useState(window.localStorage.getItem('userChatIds') ? JSON.parse(window.localStorage.getItem('userChatIds')) : []);

  const handleOpenNewMessage = () => {
    setOpenNewMessage(!openNewMessage);
  };

  const handleCloseNewMessage = () => {
    setOpenNewMessage(false);
  };

  const handleCloseChatBox = (id) => {
    const newUserIds = userChattingIds.filter((userId) => userId !== id);
    setUserChatting(newUserIds);
    localStorage.setItem('userChatIds', JSON.stringify(newUserIds));
  };

  const handleAddUserChatting = (friendInfo) => {
    const cloneUser = [...new Set([...userChattingIds, friendInfo.id])];
    localStorage.setItem('userChatIds', JSON.stringify(cloneUser));
    setUserChatting(cloneUser);
  };

  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="flex-end">
        {userChattingIds.map((id) => (
          <Box mr={3} key={id}>
            <ChattingBox
              userId={id}
              handleClose={() => handleCloseChatBox(id)}
            />
          </Box>
        ))}

        {openNewMessage && (
          <Box mr={3}>
            <NewMessage
              handleClose={handleCloseNewMessage}
              handleAddUserChatting={handleAddUserChatting}
            />
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
