import { ComponentType, FC } from 'react';

interface RouteItem {
  key: String;
  title: String;
  tooltip?: String;
  path?: String;
  component?: FC<{}>;
  enabled: boolean;
  icon?: ComponentType;
  subRoutes?: Array<RouteItem>;
  appendDivider?: boolean;
}

export default RouteItem;
