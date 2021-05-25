import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LoadingPlaceholder from './LoadingPlaceholder';
import BoxContainer from './Box';

const useStyles = makeStyles(() => ({
  inter_draw_top: {
    background: ' #FFF',
    width: '20px',
    height: '100px',
    position: 'absolute',
    left: '100px',
  },
  inter_draw_top_2: {
    background: ' #FFF',
    width: '100%',
    height: '20px',
    position: 'absolute',
    left: '100px',
    top: '40px',
  },
  inter_draw: {
    background: ' #FFF',
    width: '100%',
    height: '20px',
    position: 'absolute',
    top: '100px',
  },
}));

const randomHeight = () => parseInt(Math.random() * 6, 10) * 50 + 300;

const PostLoading = () => {
  const classes = useStyles();
  const [height, setHeight] = useState(randomHeight());

  useEffect(() => {
    const random = setInterval(() => {
      setHeight(randomHeight());
    }, 1000);

    return () => {
      clearInterval(random);
    };
  }, []);

  return (
    <BoxContainer>
      <LoadingPlaceholder height={height}>
        <div className={classes.inter_draw_top} />
        <div className={classes.inter_draw_top_2} />
        <div className={classes.inter_draw} />
      </LoadingPlaceholder>
    </BoxContainer>
  );
};

export default PostLoading;
