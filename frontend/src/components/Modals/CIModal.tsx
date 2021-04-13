import React, { useReducer } from 'react';
import { RWDModal } from '../../model/RWDModal';
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
import { CItoolModel } from '../../model/CItool.model';

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
    select: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
  })
);

type State = {
  ci: string;
  type: string;
  access: string;
  link: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

type Action =
  | { type: 'setCI'; payload: string }
  | { type: 'setType'; payload: string }
  | { type: 'setAccess'; payload: string }
  | { type: 'setLink'; payload: string }
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
    case 'setType':
      return {
        ...state,
        type: action.payload,
      };
    case 'setAccess':
      return {
        ...state,
        access: action.payload,
      };
    case 'setLink':
      return {
        ...state,
        link: action.payload,
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

interface CIModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  ci?: CItoolModel;
  aim?: string;
}

export const CIModal: React.FC<CIModalProps> = ({
  isModalVisible,
  onBackdropClick,
  ci,
  aim,
}) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, {
    ci: ci?.ci || 'name',
    type: ci?.type || 'JENKINS',
    access: ci?.access || 'Public',
    link: ci?.link || 'link',
    isButtonDisabled: false,
    helperText: '',
    isError: false,
  });

  const handleAIM = (): void => {
    if (aim === 'Add') {
      axios
        .post(`http://127.0.0.1:8000/api/ci/`, {
          withCredentials: true,
          ci: state.ci,
          type: state.type,
          access: state.access,
          link: state.link,
          owner: user.id,
        })
        .then(() => {
          dispatch({
            type: 'ChangeSuccess',
            payload: `CI ${aim}ed Successfully`,
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
        .put(`http://127.0.0.1:8000/api/ci/${ci?.id}/`, {
          withCredentials: true,
          ci: state.ci,
          type: state.type,
          access: state.access,
          link: state.link,
          owner: user.id,
        })
        .then(() => {
          dispatch({
            type: 'ChangeSuccess',
            payload: `CI ${aim}ed Successfully`,
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

  const handleCIChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setCI',
      payload: event.target.value,
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: any }>) => {
    dispatch({
      type: 'setType',
      payload: event.target.value.toString(),
    });
  };

  const handleAccessChange = (event: React.ChangeEvent<{ value: any }>) => {
    dispatch({
      type: 'setAccess',
      payload: event.target.value,
    });
  };

  const handleLinkChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setLink',
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
            <CardHeader className={classes.header} title={`${aim} CI tool`} />
            <CardContent>
              <div>
                <TextField
                  error={state.isError}
                  fullWidth
                  id='ci_name'
                  label='CI Name'
                  placeholder={state.ci || 'SomeCI_Name'}
                  defaultValue={state.ci}
                  margin='normal'
                  onChange={handleCIChange}
                  helperText={state.helperText}
                />
                <TextField
                  error={state.isError}
                  fullWidth
                  id='ci_link'
                  label='CI Link (https://master...com)'
                  placeholder={state.link || 'https://master...com'}
                  defaultValue={state.link}
                  margin='normal'
                  onChange={handleLinkChange}
                  helperText={state.helperText}
                />
                <Select
                  className={classes.select}
                  native
                  fullWidth
                  value={state.type}
                  id='ci_type'
                  onChange={handleTypeChange}
                >
                  {state.type === 'JENKINS' ? (
                    <>
                      <option value={'JENKINS'}>Jenkins</option>
                      <option value={'TRAVIS'}>Travis</option>
                    </>
                  ) : (
                    <>
                      <option value={'TRAVIS'}>Travis</option>
                      <option value={'JENKINS'}>Jenkins</option>
                    </>
                  )}
                </Select>
                <Select
                  className={classes.select}
                  native
                  fullWidth
                  value={state.access}
                  id='ci_access'
                  onChange={handleAccessChange}
                >
                  {state.access === 'Public' ? (
                    <>
                      <option value={'Public'}>Public</option>
                      {user.isLogin && (
                        <option value={'Private'}>Private</option>
                      )}
                    </>
                  ) : (
                    <>
                      {user.isLogin && (
                        <option value={'Private'}>Private</option>
                      )}
                      <option value={'Public'}>Public</option>
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
