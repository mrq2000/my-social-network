import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import ReactCrop from 'react-image-crop';
import {
  Toolbar, Dialog, DialogContent, AppBar, Box,
  Button, Typography, Tooltip, IconButton, Slide,
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../helpers/axios';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    color: '#fff',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  previewAvatar: {
    width: '20rem',
    height: '20rem',
    borderRadius: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  hidden: {
    display: 'none',
  },
  uploadButton: {
    cursor: 'pointer',
    borderRadius: '0.5rem',
    backgroundColor: theme.palette.primary.main,

    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',

    padding: theme.spacing(1),
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const UpdateAvatar = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 50,
    x: 25,
    y: 25,
    aspect: 1,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const {
    mutate: updateAvatar,
  } = useMutation(async () => {
    const formData = new FormData();
    const dataUrl = atob(previewCanvasRef.current.toDataURL().split(',')[1]);
    const arr = [];
    for (let i = 0; i < dataUrl.length; i += 1) {
      arr.push(dataUrl.charCodeAt(i));
    }
    const file = new Blob([new Uint8Array(arr)], { type: 'image/png' });

    formData.set('mainAvatar', file);
    const res = await api.post('/me/update-avatar', formData);
    return res.data;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('me');
      await queryClient.invalidateQueries('my-page');
      await queryClient.invalidateQueries('my-posts');

      enqueueSnackbar('Cập nhật Avatar thành công', { variant: 'success' });
      setOpen(false);
    },
    onError: () => {
      enqueueSnackbar('Có lỗi xảy ra :(. Vui lòng thử lại sau', { variant: 'error' });
    },
  });

  const onSubmit = () => {
    if (previewCanvasRef.current && imgRef.current) {
      updateAvatar();
    } else {
      enqueueSnackbar('Bạn chưa chọn ảnh', { variant: 'error' });
    }
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size > 100000) {
        enqueueSnackbar('Please! upload image < 100kb', { variant: 'error' });
      } else {
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg(reader.result));
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const newCrop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = newCrop.width * pixelRatio;
    canvas.height = newCrop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      newCrop.x * scaleX,
      newCrop.y * scaleY,
      newCrop.width * scaleX,
      newCrop.height * scaleY,
      0,
      0,
      newCrop.width,
      newCrop.height,
    );
  }, [completedCrop]);

  return (
    <>
      <Dialog open={open} fullScreen TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Update Avatar
            </Typography>

            <Button autoFocus color="inherit" onClick={onSubmit}>
              Update
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Box mt={2}>
            <input type="file" id="avatar" accept="image/*" onChange={onSelectFile} className={classes.hidden} />
            <label htmlFor="avatar" className={classes.uploadButton}>
              Upload Image From Your Computer
            </label>
          </Box>

          <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
            <Box width="50%" display="flex" justifyContent="center" alignItems="center">
              <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              />
            </Box>

            <Box width="50%" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Typography variant="h3">
                Preview Avatar
              </Typography>

              <canvas ref={previewCanvasRef} className={classes.previewAvatar} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Tooltip title="Update User">
        <IconButton aria-label="edit" color="primary" onClick={() => setOpen(true)}>
          <CameraAltIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default UpdateAvatar;
