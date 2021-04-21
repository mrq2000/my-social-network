import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Typography, Divider,
} from '@material-ui/core';
import PropTypes from 'prop-types';

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
}));

const CoverImage = ({ data }) => {
  const classes = useStyles();

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

        <Divider className={classes.divider} />
      </Box>
    </>
  );
};

CoverImage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CoverImage;
