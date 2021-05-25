import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  CssBaseline, LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';
import Swal from 'sweetalert2';
import { useQueryClient } from 'react-query';

import Header from './Header';
import BubbleChat from '../bubbleChat/BubbleChat';
import useMe from '../../queries/useMe';
import useFriendRequest from '../../queries/useFriendRequest';

import { initialState, AppReducer } from '../../AppReducer';
import { AppStateContext, AppDispatchContext } from '../../AppContext';

import { getToken } from '../../helpers/storage';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flex: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.dark,
  },
  avatar: {
    height: '3rem',
    width: '3rem',
    objectFit: 'cover',
    cursor: 'pointer',

    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },
}));

const Layout = ({ children }) => {
  const history = useHistory();
  const { isError, data } = useMe();
  const { data: friendRequest } = useFriendRequest();
  const queryCache = useQueryClient();

  const [currentSocket, setCurrentSocket] = useState(null);

  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState, ...data,
  });

  const classes = useStyles();

  if (isError) {
    history.push('/sign-in');
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'updateState',
        payload: { ...initialState, ...data, currentSocket },
      });
    }
  }, [currentSocket, data]);

  useEffect(() => {
    const socket = io(process.env.BACKEND_BASE_URL);
    setCurrentSocket(socket);
    const token = getToken();

    socket.emit('addUser', { token });

    socket.on('friendRequest', (res) => {
      queryCache.invalidateQueries(['user', res.id]);
      queryCache.invalidateQueries('friendRequest');
    });

    socket.on('friendRequestAccept', (res) => {
      Swal.fire({
        title: 'Lời mời kết bạn của bạn đã được chấp nhận',
        html: (
          <Box display="flex" alignItems="center" width="100%">
            <img src={res.avatar_name} className={classes.avatar} alt="avatar" />
            <b>${res.full_name}</b>
          </Box>),
      });
      queryCache.invalidateQueries(['user', res.id]);
      queryCache.invalidateQueries(['user', res.id, 'page']);
      queryCache.invalidateQueries('friendRequest');
    });

    return () => {
      socket.emit('disconnection');

      socket.off();
    };
  }, []);

  if (data) {
    return (
      <>
        <AppStateContext.Provider value={state}>
          <AppDispatchContext.Provider value={{ dispatch }}>
            <CssBaseline />
            <Header user={data} friendRequest={friendRequest ? friendRequest.friendRequest : []} />

            <main className={classes.content} id="main">
              <div className={classes.appBarSpacer} />

              <div>
                {children}
              </div>

              <BubbleChat />
            </main>
          </AppDispatchContext.Provider>
        </AppStateContext.Provider>
      </>
    );
  }

  return <LinearProgress color="secondary" />;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
