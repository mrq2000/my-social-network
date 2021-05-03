import React, { useState, useEffect, useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Typography, Box, Button } from '@material-ui/core';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import SignUpDialog from './SignUpDialog';
import DemoDialog from './DemoDialog';
import { api, setToken } from '../../helpers/axios';

const SignIn = () => {
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openDemo, setOpenDemo] = useState(false);
  const [providerAccessToken, setProviderAccessToken] = useState('');

  const handleCloseSignUp = useCallback(() => {
    setOpenSignUp(false);
  }, []);

  const handleCloseDemo = useCallback(() => {
    setOpenDemo(false);
  }, []);

  const handleOpenDemo = useCallback(() => {
    setOpenDemo(true);
  }, []);

  const {
    isLoading, error, data, mutate: signIn,
  } = useMutation(async (accessToken) => {
    const res = await api.post('/sign-in', {
      providerName: 'GOOGLE',
      providerAccessToken: accessToken,
    });
    return res.data;
  });

  const handleSignIn = (response) => {
    setProviderAccessToken(response.accessToken);
    signIn(response.accessToken);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.response && error.response.data ? error.response.data.message : error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.hasAccount === false) {
        setOpenSignUp(true);
      }
    }
  }, [data, history]);

  if (data && data.accessToken) {
    setToken(data.accessToken);
    history.push('/');
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Sign In With Google"
        onSuccess={(response) => handleSignIn(response)}
        disabled={isLoading}
      />

      <Typography align="center" color="error">
        {errorMessage}
      </Typography>

      <SignUpDialog
        open={openSignUp}
        handleClose={handleCloseSignUp}
        providerAccessToken={providerAccessToken}
      />

      <Box mt={2}>
        <Button onClick={handleOpenDemo}>
          Sử Dụng Tài Khoản Demo
        </Button>
      </Box>

      <DemoDialog
        open={openDemo}
        handleClose={handleCloseDemo}
      />
    </Box>
  );
};

export default SignIn;
