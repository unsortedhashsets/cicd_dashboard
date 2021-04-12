import React, { ReactElement, useReducer, FC, useState } from 'react';
import {
  createMuiTheme,
  Theme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// components
import Layout from './components/Layout';

// theme
import { lightTheme, darkTheme } from './theme/appTheme';

// app routes
import { routes, loginRoute } from './config';

// constants
import { APP_TITLE } from './utils/constants';

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

function App() {
  const [isLoading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.headers.common['Authorization'] = 'sessionid';

  axios
    .get('http://127.0.0.1:8000/api/set-csrf/', { withCredentials: true })
    .then((res) => console.log(res));

  axios
    .get('http://127.0.0.1:8000/api/user/', {})
    .then((response) => {
      setUserModel(response.data[0]);
      user.isLogin = true;
      setLoading(false);
    })
    .catch(() => {
      user.isLogin = false;
      setLoading(false);
    });

  const [useDefaultTheme, toggle] = useReducer((theme) => !theme, true);

  // define custom theme
  let theme: Theme = createMuiTheme(useDefaultTheme ? darkTheme : lightTheme);
  theme = responsiveFontSizes(theme);

  if (isLoading) {
    return <div className='App'>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <AppContext.Provider value={null}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Layout toggleTheme={toggle} useDefaultTheme={useDefaultTheme}>
                {/* for each route config, a react route is created */}
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
                <Route
                  key={`${loginRoute.key}`}
                  path={`${loginRoute.path}`}
                  component={loginRoute.component || DefaultComponent}
                  exact
                />
              </Layout>
            </Switch>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
