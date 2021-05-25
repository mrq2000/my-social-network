import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Container from '../common/Box';

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    margin: 0,
  },
  avatar: {
    objectFit: 'cover',
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  totalText: {
    color: theme.palette.text.secondary,
    fontSize: '1rem',
  },
  aspect1_1: {
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
  },
  avatar_container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    cursor: 'pointer',
  },
  button: {
    color: '#3b7ef2',
    fontSize: '1rem',
  },
}));

const Friend = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2 className={classes.mainTitle}>
          Bạn bè
        </h2>

        <Button className={classes.button}>
          Xem tất cả bạn bè
        </Button>
      </Box>

      <Box className={classes.totalText}>
        {data.total} người bạn
      </Box>

      <Box display="flex" justifyContent="space-between" mt={1}>
        { data.data.map((friend) => (
          <Box width="30%" key={friend.id}>
            <Box className={classes.aspect1_1}>
              <Box className={classes.avatar_container} onClick={() => history.push(`/users/${friend.id}`)}>
                <img src={friend.avatar_name} alt="friendPhoto" className={classes.avatar} />
              </Box>
            </Box>
            <strong>
              {friend.full_name}
            </strong>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

Friend.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Friend;
