import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Divider,
} from '@material-ui/core';

import { useAppStateContext } from '../../AppContext';
import BoxContainer from '../common/Box';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: '3rem',
    width: '3rem',

    borderRadius: '100%',
    objectFit: 'cover',
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  newPostButton: {
    flex: 1,
    paddingLeft: theme.spacing(2),

    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '4rem',
  },
}));

const AddPost = () => {
  const classes = useStyles();
  const { avatar } = useAppStateContext();

  return (
    <BoxContainer>
      <Box display="flex" flex={1}>
        <img src={`data:image/jpeg;base64,${avatar}`} alt="my-social-network-logo" className={classes.avatar} />

        <Box display="flex" alignItems="center" className={classes.newPostButton}>
          Bạn đang nghĩ gì?
        </Box>
      </Box>

      <Box mt={2}>
        <Divider variant="middle" />
      </Box>
    </BoxContainer>
  );
};

export default AddPost;
