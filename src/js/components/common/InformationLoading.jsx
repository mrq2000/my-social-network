import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';

import Container from './Box';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
  },
  icon: {
    filter: 'invert(59%) sepia(11%) saturate(200%) saturate(135%) hue-rotate(176deg) brightness(96%) contrast(94%)',
    height: 20,
    width: 20,
  },
  preTitle: {
    marginLeft: theme.spacing(1),
  },
  mainTitle: {
    margin: 0,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#e4e6eb',
  },
}));

const Information = () => {
  const classes = useStyles();

  return (
    <Container>
      <Box mt={2}>
        <Button fullWidth variant="contained" className={classes.button}>
          Chỉnh sửa chi tiết
        </Button>
      </Box>

      <Box mt={2}>
        <Button fullWidth variant="contained" className={classes.button}>
          Thêm sở thích
        </Button>
      </Box>

      <Box mt={2}>
        <Button fullWidth variant="contained" className={classes.button}>
          Thêm nội dung đáng chú ý
        </Button>
      </Box>
    </Container>
  );
};

export default Information;
