import React, { useEffect, useState } from 'react';
import {
  Box, IconButton, Typography, Divider, InputBase,
} from '@material-ui/core';
import debounce from 'lodash.debounce';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';

import useSuggestMyFriend from '../../queries/useSuggestMyFriend';

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
    height: '3rem',
    width: '3rem',
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
}));

const NewMessage = ({ handleClose }) => {
  const classes = useStyles();

  const [keyword, setKeyword] = useState('');
  const [friendList, setFriendList] = useState([]);

  const {
    data: friends,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSuggestMyFriend(keyword, 8);

  const handleChangeKeyword = debounce((val) => {
    setKeyword(val);
  }, [500]);

  const friendString = JSON.stringify(friends);

  useEffect(() => {
    if (friends) {
      const newFriendList = [];
      friends.pages.forEach((post) => {
        newFriendList.push(...post);
      });
      setFriendList(newFriendList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendString]);

  return (
    <Box className={classes.container}>
      <Box pl={2} pr={2} pt={1} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">
          Tin nhắn mới
        </Typography>

        <IconButton className={classes.colorPink} onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box mt={2} pl={2} pr={2} mb={2} display="flex" alignItems="center">
        <Typography variant="body1" className={classes.mr_2}>
          Đến:
        </Typography>

        <InputBase onChange={(e) => handleChangeKeyword(e.target.value)} autoFocus />
      </Box>

      <Divider />

      <Box id="friend-list-suggest" pl={1} pr={1} mt={2} mb={2}>
        <InfiniteScroll
          dataLength={friendList.length}
          hasMore={hasNextPage}
          next={fetchNextPage}
          scrollableTarget="friend-list-suggest"
        >
          {!isFetching && friendList.map((friendInfo) => (
            <Box
              key={friendInfo.id}
              display="flex"
              width="100%"
              p={1}
              alignItems="center"
              className={classes.friendContainer}
              onClick={() => console.log(friendInfo.id)}
            >
              <Box mr={2} display="flex">
                <img src={friendInfo.avatar_name} alt="avatar" className={classes.friendAvatar} />
              </Box>

              <Box className={classes.friendName}>
                {friendInfo.full_name}
              </Box>
            </Box>
          ))}
        </InfiniteScroll>
      </Box>

      {isFetching && (
        <Box display="flex" justifyContent="center" mt={1}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

NewMessage.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NewMessage;
