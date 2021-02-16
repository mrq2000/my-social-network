import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {
  Box,
} from '@material-ui/core';

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
  },
  cameraIcon: {
    position: 'absolute',
    right: '1.5rem',
    bottom: '1.5rem',
    display: 'flex',

    borderRadius: '100%',
    backgroundColor: '#e4e6eb',
    padding: theme.spacing(1),

    cursor: 'pointer',
  },
  coverImgButton: {
    position: 'absolute',
    right: '3rem',
    bottom: '1.5rem',
    display: 'flex',

    borderRadius: theme.spacing(1),
    backgroundColor: '#e4e6eb',
    padding: theme.spacing(1),

    cursor: 'pointer',
  },
  buttonText: {
    fontWeight: 'bold',

    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(0.5),
  },
}));

const CoverImage = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.background}>
        <div className={classes.coverImgContainer}>
          <img alt="background" className={classes.coverImg} src="https://cdnmedia.thethaovanhoa.vn/Upload/YSu1TgnVnIyxx9zisEumA/files/2021/01/2101/5.jpg" />

          <Box className={classes.coverImgButton}>
            <CameraAltIcon />

            <div className={classes.buttonText}>
              Chỉnh sửa ảnh bìa
            </div>
          </Box>
        </div>
      </div>

      <Box display="flex" alignItems="center" flexDirection="column" className={classes.infoContainer}>
        <Box display="flex" height="0px" alignItems="flex-end" mt={4}>
          <div className={classes.avatarImgContainer}>
            <img alt="avatar" className={classes.avatarImg} src="https://cdnmedia.thethaovanhoa.vn/Upload/YSu1TgnVnIyxx9zisEumA/files/2021/01/2101/5.jpg" />

            <div className={classes.cameraIcon}>
              <CameraAltIcon />
            </div>
          </div>
        </Box>
        <div>
          sssssssssssssssssssssssss
        </div>
      </Box>
    </>
  );
};

export default CoverImage;
