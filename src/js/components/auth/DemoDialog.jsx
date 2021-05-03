import React from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Slide, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { setToken } from '../../helpers/axios';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const DemoDialog = ({ open, handleClose }) => {
  const history = useHistory();

  const usersDemo = {
    8: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTYyMDAzOTg3OCwibmJmIjoxNjIwMDM5ODc4LCJleHAiOjE2NTE1NzU4NzgsImlzcyI6Im15LXNvY2lhbC1uZXR3b3JrIn0.V07Oh0HDCiMMZuRM2LarUoifYabrXHLr8i8ul3S1I6A',
      userSmallChatIds: '[11,12]',
      userChatIds: '[12]',
    },
    12: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2MjAwMzk5MDQsIm5iZiI6MTYyMDAzOTkwNCwiZXhwIjoxNjUxNTc1OTA0LCJpc3MiOiJteS1zb2NpYWwtbmV0d29yayJ9.4CIP08wW79-oxxuBDI8EnlW9EnUbYycZff73ZOlpouA',
      userSmallChatIds: '[8]',
      userChatIds: '[8]',
    },
  };

  const addDemoUser = (userId) => {
    const user = usersDemo[userId];
    setToken(user.token);
    localStorage.setItem('userSmallChatIds', user.userSmallChatIds);
    localStorage.setItem('userChatIds', user.userChatIds);

    history.push('/');
  };

  return (
    <Dialog
      open={open}
      keepMounted
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Chọn tài khoản DEMO
      </DialogTitle>

      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Box mt={1} width="60%">
            <Button variant="outlined" color="primary" fullWidth onClick={() => addDemoUser(8)}>
              User 1
            </Button>
          </Box>

          <Box mt={1} width="60%">
            <Button variant="outlined" color="primary" fullWidth onClick={() => addDemoUser(12)}>
              User 2
            </Button>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DemoDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DemoDialog;
