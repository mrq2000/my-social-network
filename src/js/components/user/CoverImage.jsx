import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Typography, Divider, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import useMe from '../../queries/useMe';
import friendRequestStatus from '../../enums/friendRequestStatus';
import { useAppStateContext } from '../../AppContext';
import { getToken } from '../../helpers/storage';

const useStyles = makeStyles((theme) => ({
  background: {
    height: '23rem',
    backgroundImage: `linear-gradient(${theme.palette.primary.main}, #fff)`,

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  coverImgContainer: {
    height: '100%',
    width: '100%',
    maxWidth: '65rem',

    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    borderBottomLeftRadius: '0.8rem',
    borderBottomRightRadius: '0.8rem',
  },
  coverImg: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',

    borderBottomLeftRadius: '0.8rem',
    borderBottomRightRadius: '0.8rem',
  },
  infoContainer: {
    backgroundColor: '#fff',
    paddingBottom: theme.spacing(2),
    boxShadow: '0px 2px 2px 0px #ffb6c1',

  },
  avatarImgContainer: {
    width: '15rem',
    height: '15rem',
    borderRadius: '100%',

    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#fff',
  },
  avatarImg: {
    height: '90%',
    width: '90%',
    objectFit: 'cover',

    borderRadius: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  buttonText: {
    fontWeight: 'bold',

    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  hoverButton: {
    '&:hover': {
      backgroundColor: '#cfd1d3',
    },
  },
  fullName: {
    fontWeight: 'revert',
  },
  slogan: {
    color: theme.palette.text.secondary,
    fontSize: '1.4rem',
  },
  divider: {
    width: '80%',
    maxWidth: '60rem',
    marginTop: theme.spacing(2),
  },
  font16: {
    fontSize: 16,
  },
  primaryBtn: {
    color: '#fff',
    fontSize: 16,
  },
}));

const CoverImage = ({ data }) => {
  const classes = useStyles();
  const { data: me } = useMe();
  const [requestInfo, setRequestInfo] = useState(data.friendStatus);

  const { currentSocket } = useAppStateContext();

  const handleAddFriend = () => {
    currentSocket.emit('newFriendRequest',
      { token: getToken(), userId: data.id },
      (isSuccess) => {
        if (isSuccess) {
          setRequestInfo({
            status: friendRequestStatus.REQUEST,
            sender_id: me.id,
          });
        } else {
          Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
      });
  };

  const handleAcceptFriend = () => {
    currentSocket.emit('acceptFriendRequest',
      { token: getToken(), userId: data.id },
      (isSuccess) => {
        if (isSuccess) {
          setRequestInfo({
            status: friendRequestStatus.ACCEPTED,
            sender_id: me.id,
          });
        } else {
          Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
      });
  };

  const renderFriendRequest = () => {
    if (!requestInfo) {
      return (
        <Button variant="contained" color="primary" className={classes.primaryBtn} onClick={handleAddFriend}>
          Gửi lời mời kết bạn
        </Button>
      );
    }

    if (requestInfo.status === friendRequestStatus.ACCEPTED) {
      return (
        <>Bạn Bè</>
      );
    }

    if (me.id === requestInfo.sender_id) {
      if (requestInfo.status === friendRequestStatus.REQUEST) {
        return (
          <>Đã gửi lời mời kết bạn</>
        );
      }
    }

    if (me.id === requestInfo.receiver_id) {
      if (requestInfo.status === friendRequestStatus.REQUEST) {
        return (
          <>
            <Box mr={2}>
              <Button
                variant="contained"
                color="primary"
                className={[classes.primaryBtn, classes.font16].join(' ')}
                onClick={handleAcceptFriend}
              >
                Chấp nhận
              </Button>
            </Box>

            <Button variant="contained" className={[classes.font16].join(' ')}>
              Từ chối
            </Button>
          </>
        );
      }
    }

    return <></>;
  };

  return (
    <>
      <div className={classes.background}>
        <div className={classes.coverImgContainer}>
          <img alt="cover_image" className={classes.coverImg} src={data.cover_name} />
        </div>
      </div>

      <Box display="flex" alignItems="center" flexDirection="column" className={classes.infoContainer}>
        <Box display="flex" height="0px" alignItems="flex-end" mt={4}>
          <div className={classes.avatarImgContainer}>
            <img alt="avatar" className={classes.avatarImg} src={data.avatar_name} />
          </div>
        </Box>

        <Typography variant="h4" className={classes.fullName}>
          {data.full_name}
        </Typography>

        <Box className={classes.slogan} mt={1}>
          {data.slogan}
        </Box>

        <Box mt={1} display="flex" className={classes.font16}>
          {renderFriendRequest()}
        </Box>

        <Divider className={classes.divider} />
      </Box>
    </>
  );
};

CoverImage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CoverImage;
