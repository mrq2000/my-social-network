import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { useAppStateContext } from '../../AppContext';
import BoxContainer from '../common/Box';
import postTypeEnum from '../../enums/postType';
import { formatLocalDateTime } from '../../helpers/dayjs';
import ActionsPost from './ActionsPost';

const useStyles = makeStyles((theme) => ({
  fullName: {
    fontWeight: 'bold',
  },
  avatar: {
    height: '3rem',
    width: '3rem',

    borderRadius: '100%',
    objectFit: 'cover',
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  contentText: {
    fontSize: '1rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  postDetail: {
    color: theme.palette.text.secondary,
  },
  moreOptionButtonBox: {
    cursor: 'pointer',
    borderRadius: '100%',
    width: '2rem',
    height: '2rem',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  img: {
    width: '100%',
  },
}));

const MyPost = ({ data }) => {
  const classes = useStyles();
  const { avatar, full_name: fullName } = useAppStateContext();

  const renderIcon = (
    data.type === postTypeEnum.PUBLIC ? <PublicIcon fontSize="small" /> : <LockIcon fontSize="small" />
  );

  return (
    <BoxContainer>
      <Box display="flex" alignItems="center">
        <img src={`data:image/jpeg;base64,${avatar}`} alt="my-social-network-logo" className={classes.avatar} />

        <Box display="flex" flexDirection="column" mb={2} flex={1}>
          <Typography className={classes.fullName}>
            {fullName}
          </Typography>

          <Box className={classes.postDetail} display="flex" alignItems="center" flex={1}>
            <Box mr={1}>
              {formatLocalDateTime(data.created_at)}
            </Box>
            {renderIcon}
          </Box>
        </Box>

        <Box
          alignSelf="baseline"
          className={classes.moreOptionButtonBox}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <MoreHorizIcon />
        </Box>
      </Box>

      <Box className={classes.contentText}>
        {data.content}
      </Box>

      <Box width="100%">
        {data.image_name
          ? <img src={data.image_name} alt="img" className={classes.img} />
          : null}
      </Box>

      <Box mt={1}>
        <ActionsPost likes={data.likes} postId={data.id} likeByMe={data.me} />
      </Box>
    </BoxContainer>
  );
};

MyPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MyPost;
