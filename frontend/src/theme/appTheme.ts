import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors';

// define light theme colors
export const lightTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: red[500],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});

// define dark theme colors
export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: red[500],
    },
  },
});
