import React, { useReducer } from 'react';
import { RWDModal } from '../model/RWDModal';
import { TokenModel } from '../model/Token.model';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import axios from 'axios';
import { user } from '../model/User.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
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

type State = {
  ci: string;
  token: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

const initialState: State = {
  ci: '',
  token: '',
  isButtonDisabled: false,
  helperText: '',
  isError: false,
};

type Action =
  | { type: 'setCI'; payload: string }
  | { type: 'setToken'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'ChangeSuccess'; payload: string }
  | { type: 'ChangeFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setCI':
      return {
        ...state,
        ci: action.payload,
      };
    case 'setToken':
      return {
        ...state,
        token: action.payload,
      };
    case 'setIsButtonDisabled':
      return {
        ...state,
        isButtonDisabled: action.payload,
      };
    case 'ChangeSuccess':
      return {
        ...state,
        helperText: action.payload,
        isError: false,
      };
    case 'ChangeFailed':
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

interface TokenModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  tokenError?: boolean;
  token?: TokenModel;
  aim?: string;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  tokenError,
  isModalVisible,
  onBackdropClick,
  token,
  aim,
}) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAIM = (): void => {
    if (aim === 'Add') {
      axios
        .post(`http://127.0.0.1:8000/api/token/`, {
          withCredentials: true,
          token: state.token,
          ci: Number(state.ci),
          user: user.id,
        })
        .then(() => {
          onBackdropClick();
          window.location.replace('/tokens');
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios
        .put(`http://127.0.0.1:8000/api/token/${token?.id}/`, {
          withCredentials: true,
          token: state.token,
          ci: Number(state.ci),
          user: user.id,
        })
        .then(() => {
          onBackdropClick();
          window.location.replace('/tokens');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleTokenChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setToken',
      payload: event.target.value,
    });
  };

  const handleCIchange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setCI',
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
            <CardHeader className={classes.header} title={`${aim} token`} />
            <CardContent>
              <div>
                <TextField
                  error={tokenError}
                  fullWidth
                  id='ci_id'
                  label='CI ID (digit)'
                  placeholder={token?.ci.toString() || '0'}
                  margin='normal'
                  onChange={handleCIchange}
                />
                <TextField
                  error={tokenError}
                  fullWidth
                  id='token'
                  label='Token'
                  placeholder={token?.token || 'xxxxxxx'}
                  margin='normal'
                  onChange={handleTokenChange}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                className={classes.loginBtn}
                onClick={handleAIM}
              >
                {aim}
              </Button>
            </CardActions>
          </Card>
        </form>
      }
    />
  );
};
