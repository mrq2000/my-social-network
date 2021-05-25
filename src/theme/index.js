import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#f0f2f5',
      default: colors.common.white,
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
    MuiButton: {
      label: {
        textTransform: 'none',
      },
    },
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
    MuiPopover: {
      paper: {
        boxShadow: '0 12px 28px 0 rgb(100 83 83 / 20%),0 2px 4px 0 rgba(0, 0, 0, 0.1),inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  shadows,
});

export default theme;
