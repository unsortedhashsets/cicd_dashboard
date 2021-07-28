import React, { useReducer } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  TextField,
  Button,
  createStyles,
  makeStyles,
  Select,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import { user } from '../../model/User.model';
import { RWDModal } from '../../model/RWDModal';
import { TokenModel } from '../../model/Token.model';

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

type State = {
  ci: string;
  token: string;
  access: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

type Action =
  | { type: 'setCI'; payload: string }
  | { type: 'setToken'; payload: string }
  | { type: 'setAccess'; payload: string }
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
    case 'setAccess':
      return {
        ...state,
        access: action.payload,
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
  token?: TokenModel;
  aim?: string;
}

export const TokenModal: React.FC<TokenModalProps> = ({
  isModalVisible,
  onBackdropClick,
  token,
  aim,
}) => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, {
    ci: token?.ci.toString() || '0',
    token: token?.token || 'xxsxasxxafsfawercq',
    access: token?.access || 'Private',
    isButtonDisabled: false,
    helperText: '',
    isError: false,
  });

  const handleAIM = (): void => {
    if (aim === 'Add') {
      axios
        .post(`/api/token/`, {
          withCredentials: true,
          token: state.token,
          ci: Number(state.ci),
          user: user.id,
          access: state.access,
        })
        .then(() => {
          dispatch({
            type: 'ChangeSuccess',
            payload: `Token ${aim}ed Successfully`,
          });
          onBackdropClick();
          window.location.reload();
        })
        .catch((e) => {
          dispatch({
            type: 'ChangeFailed',
            payload: 'Something failed',
          });
        });
    } else {
      axios
        .put(`/api/token/${token?.id}/`, {
          withCredentials: true,
          token: state.token,
          ci: Number(state.ci),
          user: user.id,
          access: state.access,
        })
        .then(() => {
          dispatch({
            type: 'ChangeSuccess',
            payload: `Token ${aim}ed Successfully`,
          });
          onBackdropClick();
          window.location.reload();
        })
        .catch((e) => {
          dispatch({
            type: 'ChangeFailed',
            payload: 'Something failed',
          });
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

  const handleAccessChange = (event: React.ChangeEvent<{ value: any }>) => {
    dispatch({
      type: 'setAccess',
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
                  error={state.isError}
                  fullWidth
                  id='ci_id'
                  label='CI ID (digit)'
                  placeholder={token?.ci.toString() || state.ci.toString()}
                  defaultValue={token?.ci.toString() || state.ci.toString()}
                  margin='normal'
                  onChange={handleCIchange}
                />
                <TextField
                  error={state.isError}
                  fullWidth
                  id='token'
                  label='Token'
                  placeholder={token?.token || state.token}
                  defaultValue={token?.token || state.token}
                  margin='normal'
                  onChange={handleTokenChange}
                  helperText={state.helperText}
                />
                <Select
                  className={classes.card}
                  native
                  fullWidth
                  value={state.access}
                  id='ci_access'
                  onChange={handleAccessChange}
                >
                  {state.access === 'Private' ? (
                    <>
                      <option value={'Private'}>Private</option>
                      {user.isLogin && <option value={'Shared'}>Shared</option>}
                    </>
                  ) : (
                    <>
                      {user.isLogin && <option value={'Shared'}>Shared</option>}
                      <option value={'Private'}>Private</option>
                    </>
                  )}
                </Select>
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                className={classes.Btn}
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
