import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import NewMessage from './NewMessage';
import ChattingBox from './ChattingBox';
import SmallBubble from './SmallBubble';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'fixed',
    bottom: 0,
    right: 30,
  },
  newMessageButton: {
    boxShadow: theme.shadows[1],
    backgroundColor: '#fff',

    marginBottom: 30,
  },
}));

const BubbleChat = () => {
  const classes = useStyles();
  const [openNewMessage, setOpenNewMessage] = useState(false);
  const [userChattingIds, setUserChatting] = useState(window.localStorage.getItem('userChatIds') ? JSON.parse(window.localStorage.getItem('userChatIds')) : []);
  const [userSmallChatIds, setUserSmallChat] = useState(window.localStorage.getItem('userSmallChatIds') ? JSON.parse(window.localStorage.getItem('userSmallChatIds')) : []);

  // new message
  const handleOpenNewMessage = useCallback(() => {
    setOpenNewMessage(!openNewMessage);
  }, [openNewMessage]);

  const handleCloseNewMessage = useCallback(() => {
    setOpenNewMessage(false);
  }, []);

  // current chatting
  const handleCloseChatBox = useCallback((id) => {
    const newUserIds = userChattingIds.filter((userId) => userId !== id);
    setUserChatting(newUserIds);
    localStorage.setItem('userChatIds', JSON.stringify(newUserIds));
  }, [userChattingIds]);

  const handleAddUserChatting = useCallback((id) => {
    const cloneUser = [...new Set([...userChattingIds, id])];
    localStorage.setItem('userChatIds', JSON.stringify(cloneUser));
    setUserChatting(cloneUser);
  }, [userChattingIds]);

  // small chat
  const handleClosedSmallChat = useCallback((id) => {
    const newUserIds = userSmallChatIds.filter((userId) => userId !== id);
    setUserSmallChat(newUserIds);
    localStorage.setItem('userSmallChatIds', JSON.stringify(newUserIds));
  }, [userSmallChatIds]);

  const handleAddUserSmallChat = useCallback((id) => {
    handleCloseChatBox(id);

    const cloneUser = [...new Set([...userSmallChatIds, id])];
    localStorage.setItem('userSmallChatIds', JSON.stringify(cloneUser));
    setUserSmallChat(cloneUser);
  }, [handleCloseChatBox, userSmallChatIds]);

  useEffect(() => {
  }, [userSmallChatIds]);

  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="flex-end">
        {userChattingIds.map((id) => (
          <Box mr={3} key={id}>
            <ChattingBox
              userId={id}
              handleClose={handleCloseChatBox}
              handleAddUserSmallChat={handleAddUserSmallChat}
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
          {userSmallChatIds && userSmallChatIds.map((userId) => (
            <Box mb={1} key={userId}>
              <SmallBubble
                userId={userId}
                handleAddUserChatting={handleAddUserChatting}
                handleClose={handleClosedSmallChat}
              />
            </Box>
          ))}

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

export default BubbleChat;
