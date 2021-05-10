import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Divider,
} from '@material-ui/core';

import LoadingPlaceholder from './LoadingPlaceholder';

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
    background: `linear-gradient(to right, ${theme.palette.primary.main} 8%, #fff 18%, ${theme.palette.primary.main} 33%)`,

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
    background: `linear-gradient(to right, ${theme.palette.secondary.main} 8%, #fff 18%, ${theme.palette.secondary.main} 33%)`,
    animationDuration: '4s',
  },
  divider: {
    width: '80%',
    maxWidth: '60rem',
    marginTop: theme.spacing(2),
  },
}));

const CoverImageLoading = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.background}>
        <LoadingPlaceholder className={classes.coverImgContainer} />
      </div>

      <Box display="flex" alignItems="center" flexDirection="column" className={classes.infoContainer}>
        <Box display="flex" height="0px" alignItems="flex-end" mt={4}>
          <div className={classes.avatarImgContainer}>
            <LoadingPlaceholder className={classes.avatarImg} />
          </div>
        </Box>

        <Box mt={4} />

        <Divider className={classes.divider} />
      </Box>
    </>
  );
};

export default CoverImageLoading;
