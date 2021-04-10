// icons
import DashboardIcon from '@material-ui/icons/BarChartOutlined';

import JobIcon from '@material-ui/icons/Build';
import CiIcon from '@material-ui/icons/Cached';
import TokenIcon from '@material-ui/icons/VpnKey';
import UserIcon from '@material-ui/icons/AccountCircle';

// components
import Dashboard from '../pages/Dashboard';
import CITools from '../pages/CItools';
import Jobs from '../pages/Jobs';
import Tokens from '../pages/Tokens';
import Login from '../pages/Login';

// interface
import RouteItem from '../model/RouteItem.model';

// define app routes
export const loginRoute: RouteItem = {
  key: 'router-login',
  title: 'Login',
  tooltip: 'Login',
  path: '/login',
  enabled: true,
  component: Login,
  icon: UserIcon,
  appendDivider: true,
};

export const routes: Array<RouteItem> = [
  {
    key: 'router-dashboard',
    title: 'Dashboard',
    tooltip: 'Dashboard',
    path: '/',
    enabled: true,
    component: Dashboard,
    icon: DashboardIcon,
    appendDivider: true,
  },
  {
    key: 'router-citools',
    title: 'CI Tools',
    tooltip: 'CI Tools',
    path: '/ci-tools',
    enabled: true,
    component: CITools,
    icon: CiIcon,
  },
  {
    key: 'router-jobs',
    title: 'Jobs',
    tooltip: 'Jobs',
    path: '/jobs',
    enabled: true,
    component: Jobs,
    icon: JobIcon,
  },
  {
    key: 'router-tokens',
    title: 'Tokens',
    tooltip: 'Tokens',
    path: '/tokens',
    enabled: false, // TODO: implement isAuth
    component: Tokens,
    icon: TokenIcon,
    appendDivider: true,
  },
];
