import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline, LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import useMe from '../../queries/useMe';

import { initialState, AppReducer } from '../../AppReducer';
import { AppStateContext, AppDispatchContext } from '../../AppContext';

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
        payload: { ...initialState, ...data },
      });
    }
  }, [data]);

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
