import React, { useEffect, useState } from 'react';
import { Grid, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';

import useMyPage from '../queries/useMyPage';

import AddPost from '../components/post/AddPost';
import MyPost from '../components/post/MyPost';
import Friend from '../components/me/Friend';

import CoverImageLoading from '../components/common/CoverImageLoading';
import PostLoading from '../components/common/PostLoading';

import MyInformation from '../components/me/Information';
import CoverImage from '../components/me/CoverImage';
import { api } from '../helpers/axios';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '62rem',
    marginTop: theme.spacing(2),
  },
}));

const Me = () => {
  const classes = useStyles();
  const { data, isLoading } = useMyPage();
  const [postData, setPostData] = useState([]);

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['my-posts'],
    async ({ pageParam = 0 }) => {
      const res = await api.get('/my-posts', {
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
    <>
      {data && <CoverImage data={data} />}
      {isLoading && <CoverImageLoading />}

      <Container className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            {data && (
              <>
                <MyInformation myInfo={data} />

                <Box mt={3}>
                  <Friend data={data.friends} />
                </Box>
              </>
            )}
          </Grid>

          <Grid item xs={7}>
            <AddPost />

            <InfiniteScroll
              dataLength={postData.length}
              hasMore={hasNextPage}
              next={fetchNextPage}
              scrollableTarget="main"
              endMessage={!isFetching && (
                <p>
                  <b>You have seen it all</b>
                </p>
              )}
            >
              { postData ? postData.map((post) => (
                <Box key={post.id} mt={2}>
                  <MyPost data={post} />
                </Box>
              )) : null}
            </InfiniteScroll>

            {isFetching && (
              <>
                <Box mt={2}>
                  <PostLoading />
                </Box>

                <Box mt={2}>
                  <PostLoading />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Me;
