import React, { useState, useEffect, useCallback } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
  Grid, Typography, Card, CardContent,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import SignUpDialog from './SignUpDialog';
import { api, setToken } from '../../helpers/axios';

const Container = styled(Card)({
  width: '30rem',
});

const SignIn = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [openSignUp, setOpenSignUp] = useState('');
  const [providerAccessToken, setProviderAccessToken] = useState('');

  const handleClose = useCallback(() => {
    setOpenSignUp(false);
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
    if (error) setErrorMessage(error.message);
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
    <Container>
      <CardContent>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Typography align="center" color="primary">
              My Social Net Work
            </Typography>
          </Grid>

          <Grid item>
            <GoogleLogin
              clientId={process.env.GOOGLE_CLIENT_ID}
              buttonText="Sign In With Google"
              onSuccess={(response) => handleSignIn(response)}
              disabled={isLoading}
            />

            <Typography align="center" color="error">
              {errorMessage}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <SignUpDialog
        open={openSignUp}
        handleClose={handleClose}
        providerAccessToken={providerAccessToken}
      />
    </Container>
  );
};

export default SignIn;
