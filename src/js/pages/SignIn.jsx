import React from 'react';
import {
  Grid, Paper, CardContent, Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SignInComponent from '../components/auth/SignIn';
import background from '../../assets/img/signin-background.jpg';
import logo from '../../assets/img/logo-blue.png';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '70%',
    minHeight: '50vh',
    backgroundColor: '#eea4b7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  container: {
    backgroundColor: '#000000',
  },
  logo: {
    width: '100%',
    padding: theme.spacing(3),
  },
}));

const SignIn = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        container
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Card className={classes.card}>
          <CardContent>
            <Grid
              container
              direction="column"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <img src={logo} alt="my-social-network-logo" className={classes.logo} />
              </Grid>

              <Grid item>
                <SignInComponent />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignIn;
