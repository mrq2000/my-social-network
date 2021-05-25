/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect, useState,
} from 'react';
import {
  Box, IconButton, Divider, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import RemoveIcon from '@material-ui/icons/Remove';
import SendIcon from '@material-ui/icons/Send';

import { getToken } from '../../helpers/storage';
import useUserInfo from '../../queries/useUserInfo';
import useUserMessage from '../../queries/useUserMessage';
import { getDifferencePerMinute, getFuckingAwesomeDate } from '../../helpers/dayjs';

import { useAppStateContext } from '../../AppContext';

const LONG_MINUTE = 5;
const SMALL_AVATAR_WIDTH = '2rem';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: theme.shadows[1],
    width: 365,
    height: 455,

    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  colorPink: {
    color: 'pink',
  },
  mr_2: {
    marginRight: 10,
  },
  friendAvatar: {
    height: '2.5rem',
    width: '2.5rem',
    objectFit: 'cover',

    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },
  friendName: {
    fontSize: 20,
  },
  friendContainer: {
    borderRadius: 10,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f1d1fa',
    },
  },
  inputMessage: {
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
    padding: '0rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  smallFriendAvatar: {
    height: SMALL_AVATAR_WIDTH,
    width: SMALL_AVATAR_WIDTH,
    objectFit: 'cover',

    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },
  chatContent: {
    lineHeight: SMALL_AVATAR_WIDTH,
    lineBreak: 'anywhere',
    whiteSpace: 'pre-wrap',

    paddingLeft: '7px',
    paddingRight: '7px',
    borderRadius: '5px',
  },
  userChatColor: {
    backgroundColor: '#e4e6eb',
  },
  myChatColor: {
    backgroundColor: theme.palette.secondary.main,
  },
  smallAvatarWidth: {
    width: SMALL_AVATAR_WIDTH,
  },
  textTime: {
    color: '#8a8d91',
    fontSize: '0.675rem',
  },
  chatContentContainer: {
    overflow: 'auto',
  },
  endMessage: {
    color: '#8a8d91',
    fontSize: '0.75rem',
  },
}));

const ChattingBox = ({ handleClose, userId, handleAddUserSmallChat }) => {
  const classes = useStyles();
  const { currentSocket } = useAppStateContext();

  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isSendingMessageId, setSendingMessageId] = useState([]);

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
  } = useUserMessage(userId, 10);

  const { data: userInfo } = useUserInfo(userId);

  const messagesString = JSON.stringify(messages);

  const renderUserChat = (withImg, content) => (
    <Box display="flex" width="100%" mb={1}>
      <Box mr={1}>
        {withImg && userInfo
          ? <img src={userInfo.avatar_name} alt="avatar" className={classes.smallFriendAvatar} />
          : <Box className={classes.smallAvatarWidth} />}
      </Box>

      <Box className={[classes.chatContent, classes.userChatColor]} display="flex" alignItems="center" maxWidth="80%">
        {content}
      </Box>
    </Box>
  );

  const renderMyChat = (content) => (
    <Box display="flex" width="100%" mb={1} justifyContent="flex-end">
      <Box className={[classes.chatContent, classes.myChatColor]} display="flex" alignItems="center" maxWidth="80%">
        {content}
      </Box>
    </Box>
  );

  const renderTime = (time) => (
    <Box mb={1} display="flex" justifyContent="center" className={classes.textTime}>
      {getFuckingAwesomeDate(time)}
    </Box>
  );

  const renderChatRow = (currentMessage, prevMessage) => {
    const result = [];

    if (prevMessage
      && getDifferencePerMinute(currentMessage.created_at, prevMessage.created_at) > LONG_MINUTE) {
      result.push(renderTime(currentMessage.created_at));
    }

    if (currentMessage.sender_id === userId) {
      const withImg = !prevMessage
        || (prevMessage.sender_id !== currentMessage.sender_id)
        || getDifferencePerMinute(currentMessage.created_at, prevMessage.created_at) > LONG_MINUTE;

      result.push(renderUserChat(withImg, currentMessage.content));
    } else {
      result.push(renderMyChat(currentMessage.content));
    }

    return result;
  };

  const EndMessage = (
    <Box display="flex" justifyContent="center" alignItems="center" mt={1} mb={1} flexDirection="column" className={classes.endMessage}>
      <div>
        Welcome to MY SOCIAL NETWORK
      </div>
      Author: Quoc Pham
    </Box>
  );

  const handleChangeMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleChat = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.length > 0) {
        const token = getToken();
        currentSocket.emit('new message', {
          userId, message: newMessage, token,
        }, (data) => console.log(data));

        const timeNow = Date.now();
        messageList.push({
          id: timeNow,
          content: newMessage,
          created_at: timeNow,
        });

        setNewMessage('');
      }
    }
  };

  // get new messages when scroll
  useEffect(() => {
    if (messages) {
      const newMessageList = [];
      messages.pages.forEach((post) => {
        newMessageList.push(...post.messages);
      });
      setMessageList(newMessageList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesString]);

  return (
    <Box className={classes.container} display="flex" flexDirection="column">
      <Box pl={2} pr={2} pt={1} pb={1} display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {
            userInfo
              ? <img src={userInfo.avatar_name} alt="avatar" className={classes.friendAvatar} />
              : <div className={classes.friendAvatar} />
          }
          <Box ml={2} className={classes.friendName}>
            {userInfo && userInfo.full_name}
          </Box>
        </Box>

        <Box>
          <IconButton className={classes.colorPink} onClick={() => handleAddUserSmallChat(userId)}>
            <RemoveIcon fontSize="small" />
          </IconButton>

          <IconButton className={classes.colorPink} onClick={() => handleClose(userId)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <Box
        pr={1}
        pl={1}
        flex={1}
        width="100%"
        display="flex"
        flexDirection="column"
        id={`boxChat-with-${userId}`}
        className={classes.chatContentContainer}
        style={{ display: 'flex', flexDirection: 'column-reverse' }}
      >
        <InfiniteScroll
          dataLength={messageList.length}
          hasMore={hasNextPage}
          scrollableTarget={`boxChat-with-${userId}`}
          next={fetchNextPage}
          endMessage={EndMessage}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse
          loader={
            (
              <Box display="flex" justifyContent="center" mt={1}>
                <CircularProgress />
              </Box>
            )
          }
        >
          {messageList.map((message, index) => (
            <Box
              key={message.id}
              width="100%"
              pr={2}
            >
              {renderChatRow(message, index > 0 && messageList[index - 1])}
            </Box>
          ))}
        </InfiniteScroll>
      </Box>

      <Box pl={2} pr={2} mt={1} mb={2} display="flex" justifyContent="space-between">
        <Box mr={2} display="flex" flex={1}>
          <TextField
            className={classes.inputMessage}
            InputProps={{ disableUnderline: true }}
            autoFocus
            multiline
            rowsMax={4}
            value={newMessage}
            onChange={handleChangeMessage}
            onKeyDown={handleChat}
          />
        </Box>

        <IconButton className={classes.colorPink} onClick={handleClose}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

ChattingBox.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleAddUserSmallChat: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default ChattingBox;
