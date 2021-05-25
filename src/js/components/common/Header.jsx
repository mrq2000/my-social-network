/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import {
  AppBar, Typography, Toolbar, IconButton, Tooltip, Box, Badge,
  Popover,
  Button,
  InputBase,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import { setToken } from '../../helpers/axios';
import logo from '../../../assets/img/logo-pink.png';
import { getFuckingAwesomeDate } from '../../helpers/dayjs';

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
    boxShadow: '0 12px 28px 0 rgb(100 83 83 / 20%),0 2px 4px 0 rgba(0, 0, 0, 0.1),inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
  },
  logo: {
    width: '20%',
    cursor: 'pointer',
  },
  avatar: {
    marginRight: theme.spacing(2),

    height: '3rem',
    width: '3rem',
    objectFit: 'cover',

    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },
  friendRequestAvatar: {
    marginRight: theme.spacing(2),

    height: '4.5rem',
    width: '4.5rem',
    objectFit: 'cover',

    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },
  userInfo: {
    cursor: 'pointer',
    borderRadius: '3rem',

    '&:hover': {
      backgroundColor: '#f0f2f5',
    },
  },
  iconButton: {
    padding: 8,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '100%',
    marginRight: 10,
    cursor: 'pointer',
  },
  friendRequestInfo: {
    padding: 10,
    display: 'flex',
    width: 360,
    fontSize: 20,
    flexDirection: 'column',
  },
  boxShadow: {
    boxShadow: theme.shadows[1],
  },
  hover: {
    padding: 10,
    borderRadius: 10,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f2f5',
    },
  },
  timeText: {
    color: '#65676b',
    fontSize: 16,
  },
  buttonStyled: {
    width: '47%',
  },
  whiteColor: {
    color: '#fff',
  },
  searchInput: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 50,
    padding: '5px 12px',
    fontSize: 16,
  },
}));

const Header = ({ user, friendRequest }) => {
  const classes = useStyles();
  const history = useHistory();
  const queryCache = useQueryClient();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const signOut = () => {
    setToken('');
    queryCache.clear();
    history.push('/');
  };

  const handleSearchUser = (e) => {
    if (e.keyCode === 13) {
      history.push(`/search?keyword=${e.target.value}`);
    }
  };

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.header}>
        <img
          src={logo}
          alt="my-social-network-logo"
          className={classes.logo}
          onClick={() => history.push('/')}
        />

        <Box ml={2} className={classes.searchInput}>
          <InputBase onKeyUp={handleSearchUser} />
        </Box>

        <div className={classes.flex} />

        <Box className={classes.iconButton} onClick={handleClick}>
          <Badge badgeContent={friendRequest ? friendRequest.length : 0} color="primary">
            <GroupAddIcon fontSize="large" />
          </Badge>
        </Box>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          classes={{ backgroundColor: 'red' }}
        >
          <Box className={classes.friendRequestInfo}>
            {friendRequest && friendRequest.map((request) => (
              <Box mb={1} className={classes.hover} width="100%" display="flex">
                <img src={request.sender.avatar_name} alt="avatar" className={classes.friendRequestAvatar} />
                <div>
                  <div>
                    <strong>{request.sender.full_name}</strong> đã gửi cho bạn lời mời kết bạn.
                  </div>
                  <div className={classes.timeText}>
                    {getFuckingAwesomeDate(request.created_at)}
                  </div>

                  <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
                    <Button variant="contained" color="primary" className={[classes.buttonStyled, classes.whiteColor].join(' ')}>
                      Chấp nhận
                    </Button>

                    <Button variant="contained" className={classes.buttonStyled}>
                      Từ chối
                    </Button>
                  </Box>
                </div>
              </Box>
            ))}
          </Box>
        </Popover>

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
  friendRequest: PropTypes.array.isRequired,
};

export default Header;
