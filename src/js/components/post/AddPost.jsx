import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box, Divider, Dialog, DialogContent, InputBase, DialogActions,
  Button, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import PublicIcon from '@material-ui/icons/Public';
import LockIcon from '@material-ui/icons/Lock';
import { useSnackbar } from 'notistack';
import { useMutation, useQueryClient } from 'react-query';

import { useAppStateContext } from '../../AppContext';
import BoxContainer from '../common/Box';
import postTypeEnum from '../../enums/postType';
import { api } from '../../helpers/axios';

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

    overflow: 'hidden',
    cursor: 'pointer',

    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '4rem',
  },
  input: {
    fontSize: '1.6rem',
  },
  dialogTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fullName: {
    fontWeight: 'bold',
  },
  postType: {
    border: 'none',
    borderRadius: '1rem',
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.secondary.main,

    padding: '0.4rem',
    width: 'fit-content',
    cursor: 'pointer',
  },
  buttonText: {
    color: '#fff',
  },
}));

const AddDialog = ({ open, handleClose }) => {
  const { avatar, full_name: fullName } = useAppStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const classes = useStyles();
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState(postTypeEnum.PUBLIC);

  const renderIcon = (
    postType === postTypeEnum.PUBLIC ? <PublicIcon /> : <LockIcon />
  );

  const handleChangeType = () => {
    if (postType === postTypeEnum.PUBLIC) {
      setPostType(postTypeEnum.PRIVATE);
    } else {
      setPostType(postTypeEnum.PUBLIC);
    }
  };

  const { mutate: addPost, isLoading } = useMutation(async () => {
    const res = await api.post('/posts', {
      content, type: postType,
    });
    return res.data;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('my-posts');
      enqueueSnackbar('Tạo bài viết thành công', { variant: 'success' });
      setContent('');
      handleClose('');
    },
    onError: () => {
      enqueueSnackbar('Có lỗi xảy ra :(. Vui lòng thử lại sau', { variant: 'error' });
    },
  });

  return (
    <Dialog open={open} onClose={() => handleClose(content)} maxWidth="sm" fullWidth>
      <Box className={classes.dialogTitle} p={1.5}>
        Tạo bài viết
      </Box>

      <Divider variant="middle" />

      <DialogContent>
        <Box display="flex" alignItems="center">
          <img src={`data:image/jpeg;base64,${avatar}`} alt="my-social-network-logo" className={classes.avatar} />

          <Box display="flex" flexDirection="column" mb={2}>
            <Typography className={classes.fullName}>
              {fullName}
            </Typography>

            <Box
              className={classes.postType}
              display="flex"
              alignItems="center"
              onClick={handleChangeType}
            >
              {renderIcon}

              <Box ml={1}>
                {postTypeEnum.getPostTypeTitle(postType)}
              </Box>
            </Box>
          </Box>
        </Box>

        <InputBase
          autoFocus
          margin="dense"
          fullWidth
          multiline
          rows={4}
          rowsMax={10}
          placeholder="Bạn đang nghĩ gì?"
          className={classes.input}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </DialogContent>

      <DialogActions>
        <Box m={2} width="100%">
          <Button
            className={classes.buttonText}
            fullWidth
            variant="contained"
            color="primary"
            disabled={content.length === 0 || isLoading}
            onClick={addPost}
          >
            Đăng
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

const AddPost = () => {
  const classes = useStyles();
  const { avatar } = useAppStateContext();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleClose = (val) => {
    setOpen(false);
    setContent(val);
  };

  return (
    <>
      <BoxContainer>
        <Box display="flex" flex={1}>
          <img src={`data:image/jpeg;base64,${avatar}`} alt="my-social-network-logo" className={classes.avatar} />

          <Box display="flex" alignItems="center" className={classes.newPostButton} onClick={() => setOpen(true)} p={2}>
            { content || 'Bạn đang nghĩ gì?' }
          </Box>
        </Box>

        <Box mt={2}>
          <Divider variant="middle" />
        </Box>
      </BoxContainer>

      <AddDialog open={open} handleClose={handleClose} />
    </>
  );
};

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddPost;
