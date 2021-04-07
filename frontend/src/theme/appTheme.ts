import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors';

// define light theme colors
export const lightTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: red[400],
      dark: red[200],
    },
    secondary: {
      main: blueGrey[400],
      dark: blueGrey[600],
    },
  },
});

// define dark theme colors
export const darkTheme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blueGrey[400],
      dark: blueGrey[600],
    },
    secondary: {
      main: red[400],
      dark: red[200],
    },
  },
});
