import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Tooltip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import NewMessage from './NewMessage';
import ChattingBox from './ChattingBox';
import SmallBubble from './SmallBubble';

import useUserList from '../../queries/useUserList';

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

  const { data: userSmallChat } = useUserList(userSmallChatIds);

  // new message
  const handleOpenNewMessage = () => {
    setOpenNewMessage(!openNewMessage);
  };

  const handleCloseNewMessage = () => {
    setOpenNewMessage(false);
  };

  // current chatting
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

  // small chat
  const handleClosedSmallChat = (id) => {
    const newUserIds = userSmallChatIds.filter((userId) => userId !== id);
    setUserSmallChat(newUserIds);
    localStorage.setItem('userSmallChatIds', JSON.stringify(newUserIds));
  };

  const handleAddUserSmallChat = (id) => {
    handleCloseChatBox(id);

    const cloneUser = [...new Set([...userSmallChatIds, id])];
    localStorage.setItem('userSmallChatIds', JSON.stringify(cloneUser));
    setUserSmallChat(cloneUser);
  };

  return (
    <div className={classes.container}>
      <Box display="flex" alignItems="flex-end">
        {userChattingIds.map((id) => (
          <Box mr={3} key={id}>
            <ChattingBox
              userId={id}
              handleClose={() => handleCloseChatBox(id)}
              handleAddUserSmallChat={() => handleAddUserSmallChat(id)}
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
          {userSmallChat && userSmallChat.map((user) => (
            <Box mb={1} key={user.id}>
              <SmallBubble
                userInfo={user}
                handleAddUserChatting={handleAddUserChatting}
                handleClose={() => handleClosedSmallChat(user.id)}
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
