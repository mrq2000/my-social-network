import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import {
  Grid, Typography, Card, CardContent,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { useMutation } from 'react-query';

import { api, setToken } from '../../helpers/axios';

const Container = styled(Card)({
  width: '30rem',
});

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    isLoading, error, data, mutate: signIn,
  } = useMutation(async (providerAccessToken) => {
    const res = await api.post('/sign-in', {
      providerName: 'GOOGLE',
      providerAccessToken,
    });
    return res.data;
  });

  const handleSignIn = (response) => {
    signIn(response.accessToken);
  };

  useEffect(() => {
    if (error) setErrorMessage(error.message);
  }, [error]);

  if (data && data.accessToken) {
    setToken(data.accessToken);
    window.location.href = '/';
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
              AMELA
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
    </Container>
  );
};

export default SignIn;
