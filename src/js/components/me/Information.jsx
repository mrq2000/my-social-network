import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import { Box, Button } from '@material-ui/core';

import Container from '../common/Box';
import homeIcon from '../../../assets/img/homeIcon.png';
import gender from '../../enums/gender';
import { formatDateUTC } from '../../helpers/dayjs';

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

const Information = ({ myInfo }) => {
  const classes = useStyles();

  const data = [
    {
      icon: <LocationCityIcon className={classes.icon} />,
      preTitle: 'Sống tại:',
      title: myInfo && myInfo.province,
    },
    {
      icon: <img src={homeIcon} alt="home" className={classes.icon} />,
      preTitle: 'Huyện:',
      title: myInfo && myInfo.district,
    },
    {
      icon: <CakeIcon className={classes.icon} />,
      preTitle: 'Ngày Sinh:',
      title: myInfo && formatDateUTC(myInfo.birthday),
    },
    {
      icon: <WcIcon className={classes.icon} />,
      preTitle: 'Giới tính:',
      title: myInfo && gender.getGender(myInfo.gender),
    },
  ];

  return (
    <Container>
      <h2 className={classes.mainTitle}>
        Giới thiệu
      </h2>

      <div>
        {data.map((val, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box display="flex" alignItems="center" mt={2} key={index}>
            {val.icon}
            <span className={classes.preTitle}>
              {val.preTitle}
            </span>

            <span className={classes.title}>
              {val.title}
            </span>
          </Box>
        ))}
      </div>

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

Information.propTypes = {
  myInfo: PropTypes.object.isRequired,
};

export default Information;
