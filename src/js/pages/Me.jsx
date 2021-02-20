import React from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/common/Layout';
import CoverImage from '../components/me/CoverImage';
import AddPost from '../components/post/AddPost';
import MyPost from '../components/post/MyPost';
import useMyPost from '../queries/useMyPost';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '62rem',
    marginTop: theme.spacing(2),
  },
}));

const Me = () => {
  const classes = useStyles();
  const { data: posts } = useMyPost();

  return (
    <Layout>
      <CoverImage />

      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            haha
          </Grid>

          <Grid item xs={6}>
            <AddPost />
            { posts ? posts.map((post) => (
              <Box key={post.id} mt={2}>
                <MyPost data={post} />
              </Box>
            )) : null}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Me;
