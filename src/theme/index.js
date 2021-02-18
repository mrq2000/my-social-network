import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#f0f2f5',
      default: '#3949ab',
      paper: colors.common.white,
    },
    primary: {
      main: '#eea4b7',
    },
    secondary: {
      main: '#fbcae37a',
    },
    text: {
      secondary: '#65676b',
    },
  },
  overrides: {
    MuiTableCell: {
      head: {
        fontWeight: 900,
      },
    },
    MuiDialogTitle: {
      root: {
        '& .MuiTypography-h6': {
          fontWeight: 'bold',
          fontSize: '16px',
          textTransform: 'uppercase',
        },
      },
    },
  },
  shadows,
});

export default theme;
