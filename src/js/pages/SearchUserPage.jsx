import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import useSuggestUser from '../queries/useSuggestUser';
import CustomBox from '../components/common/Box';

const useStyles = makeStyles((theme) => ({
  friendAvatar: {
    height: '3.5rem',
    width: '3.5rem',
    objectFit: 'cover',

    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },
  friendName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pointer: {
    cursor: 'pointer',
  },
}));

const SearchUserPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get('keyword');
  const { data, fetchNextPage, hasNextPage } = useSuggestUser(keyword, 10);
  const classes = useStyles();
  const history = useHistory();

  const [users, setUsers] = useState([]);

  const dataString = JSON.stringify(data);

  useEffect(() => {
    if (data) {
      const newMessageList = [];
      data.pages.forEach((post) => {
        newMessageList.push(...post);
      });
      setUsers(newMessageList);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataString]);

  return (
    <Box display="flex" alignItems="center" flexDirection="column" mt={2}>
      <Box maxWidth={600} width="100%">
        <InfiniteScroll
          dataLength={users.length}
          hasMore={hasNextPage}
          scrollableTarget="userSearch"
          next={fetchNextPage}
          loader={
            (
              <Box display="flex" justifyContent="center" mt={1}>
                <CircularProgress />
              </Box>
            )
          }
        >
          {users.map((user) => (
            <CustomBox width="100%" mb={2} onClick={() => { history.push(`/users/${user.id}`); }} className={classes.pointer}>
              <Box display="flex">
                {
                  user
                    ? <img src={user.avatar_name} alt="avatar" className={classes.friendAvatar} />
                    : <div className={classes.friendAvatar} />
                }
                <Box ml={2}>
                  <Box className={classes.friendName}>
                    {user && user.full_name}
                  </Box>

                  <Box>
                    Email: {user.email}
                  </Box>
                </Box>
              </Box>
            </CustomBox>
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default SearchUserPage;
