import React, { useReducer, useEffect } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { user, setUserModel } from '../../model/User.model';
import { RWDModal } from '../../model/RWDModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    Btn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: 'center',
      background: `${theme.palette.primary.dark}`,
    },
    card: {
      background: `${theme.palette.primary.main}`,
      marginTop: theme.spacing(0),
    },
  })
);

//state type

type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  username: '',
  password: '',
  isButtonDisabled: false,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setUsername'; payload: string }
  | { type: 'setPassword'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'loginSuccess'; payload: string }
  | { type: 'loginFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername':
      return {
        ...state,
        username: action.payload,
      };
    case 'setPassword':
      return {
        ...state,
        password: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'loginSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'loginFailed':
      return {
        ...state,
        helperText: action.payload,
        isError: true,
      };
    case 'setIsError':
      return {
        ...state,
        isError: action.payload,
      };
  }
};

interface LoginModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isModalVisible,
  onBackdropClick,
}) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: false,
      });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true,
      });
    }
  }, [state.username, state.password]);

  const handleLogin = () => {
    axios
      .post(`/api/login/`, {
        username: state.username,
        password: state.password,
      })
      .then(() => {
        dispatch({
          type: 'loginSuccess',
          payload: 'Login Successfully',
        });
        onBackdropClick();
        axios.get(`/api/user/`, {}).then((response) => {
          setUserModel(response.data[0]);
        });
        user.isLogin = true;
        window.location.reload();
      })
      .catch(() => {
        dispatch({
          type: 'loginFailed',
          payload: 'Incorrect username or password',
        });
      });
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setUsername',
      payload: event.target.value,
    });
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setPassword',
      payload: event.target.value,
    });
  };

  return (
    <RWDModal
      onBackdropClick={onBackdropClick}
      isModalVisible={isModalVisible}
      content={
        <form className={classes.container} noValidate autoComplete='off'>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title='Login App' />
            <CardContent>
              <div>
                <TextField
                  error={state.isError}
                  fullWidth
                  id='username'
                  type='email'
                  label='Username'
                  placeholder='Username'
                  margin='normal'
                  onChange={handleUsernameChange}
                />
                <TextField
                  error={state.isError}
                  fullWidth
                  id='password'
                  type='password'
                  label='Password'
                  placeholder='Password'
                  margin='normal'
                  helperText={state.helperText}
                  onChange={handlePasswordChange}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                className={classes.Btn}
                onClick={handleLogin}
                disabled={state.isButtonDisabled}
              >
                Login
              </Button>
            </CardActions>
          </Card>
        </form>
      }
    />
  );
};
