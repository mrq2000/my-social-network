import React, { useEffect, useState } from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useParams } from 'react-router-dom';

import useUserPage from '../queries/useUserPage';

import Layout from '../components/common/Layout';
import UserPost from '../components/post/UserPost';
import Friend from '../components/user/Friend';
import UserInformation from '../components/user/Information';
import CoverImage from '../components/user/CoverImage';

import { api } from '../helpers/axios';
import useMe from '../queries/useMe';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '62rem',
    marginTop: theme.spacing(2),
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const { data } = useUserPage(userId);
  const [postData, setPostData] = useState([]);
  const { data: me } = useMe();
  const history = useHistory();

  if (me && `${me.id}` === userId) {
    history.push('/me');
  }

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['users posts', userId],
    async ({ pageParam = 0 }) => {
      const res = await api.get(`/users/${userId}/posts`, {
        params: {
          limit: 8, offset: pageParam,
        },
      });

      return res.data;
    },
    {
      getNextPageParam: (lastPage, allPage) => (lastPage.length >= 8 ? allPage.length * 8 : false),
    },
  );

  const postString = JSON.stringify(posts);

  useEffect(() => {
    if (posts) {
      const newPost = [];
      posts.pages.forEach((post) => {
        newPost.push(...post);
      });
      setPostData(newPost);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postString]);

  return (
    <Layout>
      {data && <CoverImage data={data} />}

      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            {data && (
              <>
                <UserInformation myInfo={data} />

                <Box mt={3}>
                  <Friend data={data.friends} />
                </Box>
              </>
            )}
          </Grid>

          <Grid item xs={7}>
            <InfiniteScroll
              dataLength={postData.length}
              hasMore={hasNextPage}
              next={fetchNextPage}
              scrollableTarget="main"
              loader={<h4>Loading...</h4>}
              endMessage={(
                <p>
                  <b>You have seen it all</b>
                </p>
              )}
            >
              {postData && data ? postData.map((post) => (
                <Box key={post.id} mt={2}>
                  <UserPost data={post} user={data} />
                </Box>
              )) : null}
            </InfiniteScroll>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default UserPage;
