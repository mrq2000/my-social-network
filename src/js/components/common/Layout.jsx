import React from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline, LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import useMe from '../../queries/useMe';

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

  const classes = useStyles();

  if (isError) {
    history.push('/sign-in');
  }

  if (data) {
    return (
      <>
        <CssBaseline />
        <Header user={data} />

        <main className={classes.content} id="main">
          <div className={classes.appBarSpacer} />

          <div>
            {children}
          </div>
        </main>
      </>
    );
  }

  return <LinearProgress color="secondary" />;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
