// icons
import DashboardIcon from '@material-ui/icons/BarChartOutlined';

import JobIcon from '@material-ui/icons/Build';
import TokenIcon from '@material-ui/icons/VpnKey';
import GroupIcon from '@material-ui/icons/Group';

// components
import Dashboard from '../pages/Dashboard';
import CITools from '../pages/CITools';
import Tokens from '../pages/Tokens';
import Groups from '../pages/Groups';

// interface
import RouteItem from '../model/RouteItem.model';

// define app routes
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
    icon: JobIcon,
  },
  {
    key: 'router-tokens',
    title: 'Tokens',
    tooltip: 'Tokens',
    path: '/tokens',
    enabled: true,
    component: Tokens,
    icon: TokenIcon,
  },
  {
    key: 'router-groups',
    title: 'Groups',
    tooltip: 'Groups',
    path: '/groups',
    enabled: true,
    component: Groups,
    icon: GroupIcon,
    appendDivider: true,
  },
];
