import React, { ReactElement, FC } from 'react';
import {
  Theme,
  responsiveFontSizes,
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// components
import Layout from './components/Layout';

// theme
import { lightTheme, darkTheme } from './theme/appTheme';

// app routes
import { routes } from './config';

// Utils
import { APP_TITLE } from './utils/constants';
import useLocalStorage from './utils/useLocalStorage';

// interfaces
import RouteItem from './model/RouteItem.model';
import axios from 'axios';
import { setUserModel, user } from './model/User.model';

// define app context
const AppContext = React.createContext(null);

// default component
const DefaultComponent: FC<{}> = (): ReactElement => (
  <div>{`No Component Defined.`}</div>
);

// axios
if (process.env['REACT_APP_LOCAL'] === '1') {
  axios.defaults.baseURL = 'http://127.0.0.1:8000';
} else {
  axios.defaults.baseURL = window.location.origin;
}

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.headers.common['Authorization'] = 'sessionid';

  axios.get(`/api/set-csrf/`, { withCredentials: true });

  axios
    .get(`/api/user/`, {})
    .then((response) => {
      setUserModel(response.data[0]);
      user.isLogin = true;
    })
    .catch(() => {
      user.isLogin = false;
    });

  const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', true);

  const toggleTheme = () => {
    setDarkTheme((prevValue) => !prevValue);
  };

  // define custom theme
  let theme: Theme = createTheme(isDarkTheme ? darkTheme : lightTheme);
  theme = responsiveFontSizes(theme);

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Layout toggleTheme={toggleTheme} useDefaultTheme={isDarkTheme}>
                {routes.map((route: RouteItem) =>
                  route.subRoutes ? (
                    route.subRoutes.map((item: RouteItem) => (
                      <Route
                        key={`${item.key}`}
                        path={`${item.path}`}
                        component={item.component || DefaultComponent}
                        exact
                      />
                    ))
                  ) : (
                    <Route
                      key={`${route.key}`}
                      path={`${route.path}`}
                      component={route.component || DefaultComponent}
                      exact
                    />
                  )
                )}
              </Layout>
            </Switch>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
