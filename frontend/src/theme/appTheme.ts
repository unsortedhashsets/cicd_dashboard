import { createTheme, Theme } from '@material-ui/core/styles';
import { blueGrey, grey } from '@material-ui/core/colors';

// define light theme colors
export const lightTheme: Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: grey[300],
      main: grey[400],
      dark: grey[600],
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[400],
      dark: blueGrey[600],
    },
  },
});

// define dark theme colors
export const darkTheme: Theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: blueGrey[300],
      main: blueGrey[400],
      dark: blueGrey[600],
    },
    secondary: {
      light: grey[300],
      main: grey[400],
      dark: grey[600],
    },
  },
});
