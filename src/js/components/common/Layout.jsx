import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline, LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

import Header from './Header';
import useMe from '../../queries/useMe';
import BubbleChat from '../bubbleChat/BubbleChat';

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
}));

const Layout = ({ children }) => {
  const history = useHistory();
  const { isError, data } = useMe();
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
            <Header user={data} />

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
