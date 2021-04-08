import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { blueGrey, grey } from '@material-ui/core/colors';

// define light theme colors
export const lightTheme: Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: grey[400],
      dark: grey[600],
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
      main: grey[400],
      dark: grey[600],
    },
  },
});
