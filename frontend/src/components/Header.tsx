import React, { ReactElement, FC, useEffect } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness7Icon from '@material-ui/icons/Brightness3';
import Brightness3Icon from '@material-ui/icons/Brightness7';

// constants
import { APP_TITLE, DRAWER_WIDTH } from '../utils/constants';
import { NavLink } from 'react-router-dom';
import { loginRoute } from '../config';
import axios from 'axios';
import { defaultUserModel, user, setUserModel } from '../model/User.model';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: DRAWER_WIDTH,
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    listItemDisabled: {
      cursor: 'not-allowed',
    },
    selected: {},
  })
);

// define interface to represent component props
interface Props {
  open: boolean;
  handleMenuOpen: () => void;
  toggleTheme: () => void;
  useDefaultTheme: boolean;
}

const Header: FC<Props> = ({
  open,
  handleMenuOpen,
  toggleTheme,
  useDefaultTheme,
}): ReactElement => {
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(user);
      if (user.isLogin) {
        console.log(user);
        axios
          .get('http://127.0.0.1:8000/api/user/', {})
          .then(() => {
            user.isLogin = true;
          })
          .catch(() => {
            setUserModel([defaultUserModel]);
            user.isLogin = false;
            window.location.replace('/');
          });
      }
    }, 60000);
    return () => clearInterval(interval);
  });

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/logout/').then(() => {
      setUserModel([defaultUserModel]);
      user.isLogin = false;
      localStorage.removeItem('sessionid');
      window.location.replace('/');
    });
  };

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    if (!loginRoute.enabled) e.preventDefault();
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position='fixed'
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <IconButton
              color='inherit'
              aria-label='open menu'
              onClick={handleMenuOpen}
              edge='start'
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
              size='small'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              {APP_TITLE}
            </Typography>
          </div>
          <IconButton onClick={toggleTheme}>
            {useDefaultTheme ? (
              <Tooltip title='Switch to dark mode' placement='bottom'>
                <Brightness3Icon />
              </Tooltip>
            ) : (
              <Tooltip title='Switch to light mode' placement='bottom'>
                <Brightness7Icon />
              </Tooltip>
            )}
          </IconButton>
          {user.isLogin ? (
            <Button onClick={handleLogout}>LOGOUT</Button>
          ) : (
            <NavLink
              to={`${loginRoute.path}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              key={`${loginRoute.key}`}
              onClick={handleNavigate}
              className={clsx({
                [classes.listItemDisabled]: !loginRoute.enabled,
              })}
            >
              <Button>LOGIN</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
