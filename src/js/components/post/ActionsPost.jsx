/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import { useMutation } from 'react-query';

import { api } from '../../helpers/axios';
import likePostType from '../../enums/likePostType';
// import hahaSvg from '../../../assets/img/haha.svg';

const useStyles = makeStyles((theme) => ({
  actionContainer: {
    borderRadius: '0.4rem',
    lineHeight: '2.2rem',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    position: 'relative',

    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e2e5ec',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  reactionPosition: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    height: 0,
  },

  reactionContainer: {
    backgroundColor: '#fff',
    borderRadius: '10000px',
    boxShadow: theme.shadows[1],
    padding: '0.5rem 1rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  reactionIcon: {
    width: `calc(${100 / likePostType.getValues().length}% - 5px)`,
    borderRadius: '1000px',

    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.5)',
    },
  },
  actionsBox: {
    borderTop: '1px solid #ced0d4',
    borderBottom: '1px solid #ced0d4',
    padding: theme.spacing(0.5),
  },
  smallIcon: {
    width: '20px',
    cursor: 'pointer',
    marginLeft: theme.spacing(0.3),
  },
  likeDetailText: {
    color: '#65676b',
    fontSize: '1rem',
  },
  marginRight: {
    marginRight: '5px',
  },
}));

const ActionsPost = ({ postId, likes, likeByMe }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [defaultDisplayUser, setDefaultDisplayUser] = useState([]);
  const [myLike, setMyLike] = useState(likeByMe);

  const formatLikes = useMemo(() => {
    const result = {};
    const clonedDefaultDisplayUser = [];
    const cloneLikes = [...likes];

    if (myLike) {
      cloneLikes.push({
        user: {
          full_name: 'Bạn',
        },
        type: myLike.type,
      });
    }

    cloneLikes.forEach((like) => {
      if (clonedDefaultDisplayUser.length < 2) {
        clonedDefaultDisplayUser.push(like.user);
      }

      if (result[`${like.type}`]) {
        result[`${like.type}`].push(like.user);
      } else {
        result[`${like.type}`] = [like.user];
      }
    });

    setDefaultDisplayUser(clonedDefaultDisplayUser);
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes, myLike]);

  const renderUserLike = useMemo(() => {
    let total = 0;

    Object.keys(formatLikes).forEach((key) => {
      total += formatLikes[key].length;
    });

    return total > 0 && `${defaultDisplayUser.map((user) => user.full_name)} ${total - defaultDisplayUser.length > 0 ? `và ${total - defaultDisplayUser.length} người khác` : ''}`;
  }, [defaultDisplayUser, formatLikes]);

  const sortKey = useMemo(() => (
    Object.keys(formatLikes).sort((a, b) => (formatLikes[b].length - formatLikes[a].length))
  ), [formatLikes]);

  const formatUserLike = (key) => (
    <>
      {formatLikes[key].map((user) => (
        <div>
          {user.full_name}
        </div>
      ))}
    </>
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate: likePost } = useMutation(async (type) => {
    await api.post(`/posts/${postId}/like`, {
      type,
    });
    setMyLike({
      user: {
        full_name: 'Bạn',
      },
      type,
    });
  });

  return (
    <>
      <Box display="flex" flexDirection="row" mb={2}>
        {
          sortKey.map((key) => {
            const val = Number(key);
            const keyContainer = `${val}-${postId}`;

            return (
              <Tooltip key={keyContainer} title={formatUserLike(val)} placement="top">
                <img
                  src={likePostType.getLikePostLink(val)}
                  alt={likePostType.getLikePostTitle(val)}
                  className={classes.smallIcon}
                />
              </Tooltip>
            );
          })
        }

        <Box ml={1} className={classes.likeDetailText}>
          {renderUserLike}
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" className={classes.actionsBox}>
        <Box
          width="30%"
          className={classes.actionContainer}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        >
          {open && (
            <Box className={classes.reactionPosition}>
              <Box className={classes.reactionContainer} width={350}>
                {
                  likePostType.getValueExcept([likePostType.UNLIKE]).map((val) => (
                    <Tooltip key={val} title={likePostType.getLikePostTitle(val)} placement="top">
                      <img
                        src={likePostType.getLikePostLink(val)}
                        alt={likePostType.getLikePostTitle(val)}
                        className={classes.reactionIcon}
                        onClick={() => likePost(val)}
                      />
                    </Tooltip>
                  ))
                }
              </Box>
            </Box>
          )}

          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ color: likePostType.getPostLikeColor(myLike && myLike.type) }}
          >
            {myLike ? <img src={likePostType.getPostSmallIcon(myLike.type)} alt="icon" className={[classes.smallIcon, classes.marginRight].join(' ')} /> : <ThumbUpIcon className={classes.icon} fontSize="small" />}
            {myLike ? likePostType.getLikePostTitle(myLike.type) : 'Thích'}
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="30%"
          className={classes.actionContainer}
        >
          <ChatBubbleIcon className={classes.icon} fontSize="small" />

          Bình luận
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="30%"
          className={classes.actionContainer}
        >
          <ShareIcon className={classes.icon} fontSize="small" />

          Chia sẻ
        </Box>
      </Box>
    </>
  );
};

ActionsPost.propTypes = {
  postId: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  likeByMe: PropTypes.object.isRequired,
};

export default ActionsPost;
