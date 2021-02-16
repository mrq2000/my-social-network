import React from 'react';
import {
  AppBar, Typography, Toolbar, IconButton, Tooltip, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { setToken } from '../../helpers/axios';
import logo from '../../../assets/img/logo-pink.png';

const useStyles = makeStyles((theme) => ({
  userName: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginRight: theme.spacing(2),
  },
  flex: {
    display: 'flex',
    flex: 1,
  },
  header: {
    backgroundColor: theme.palette.background.paper,
  },
  logo: {
    width: '20%',
  },
  avatar: {
    marginRight: theme.spacing(2),

    height: '3rem',
    width: '3rem',
    objectFit: 'cover',

    backgroundColor: '#d4d0d5',
    borderRadius: '100%',
  },
  userInfo: {
    cursor: 'pointer',
    borderRadius: '3rem',

    '&:hover': {
      backgroundColor: '#f0f2f5',
    },
  },
}));

const Header = ({ user }) => {
  const classes = useStyles();
  const history = useHistory();
  const queryCache = useQueryClient();

  const signOut = () => {
    setToken('');
    queryCache.clear();
    history.push('/');
  };

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.header}>
        <img src={logo} alt="my-social-network-logo" className={classes.logo} />

        <div className={classes.flex} />

        <Box
          display="flex"
          alignItems="center"
          className={classes.userInfo}
          onClick={() => history.push('/me')}
        >
          <img src={`data:image/jpeg;base64,${user.avatar}`} alt="my-social-network-logo" className={classes.avatar} />

          <Typography variant="body1" className={classes.userName}>Hi! {user.full_name}</Typography>
        </Box>

        <Tooltip title="Sign Out">
          <IconButton onClick={() => signOut()} color="primary">
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Header;
