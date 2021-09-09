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
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import { user } from '../../model/User.model';
import { RWDModal } from '../../model/RWDModal';
import { GroupModel } from '../../model/Group.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
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
  group: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
};

type Action =
  | { type: 'setGroup'; payload: string }
  | { type: 'setIsButtonDisabled'; payload: boolean }
  | { type: 'ChangeSuccess'; payload: string }
  | { type: 'ChangeFailed'; payload: string }
  | { type: 'setIsError'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setGroup':
      return {
        ...state,
        group: action.payload,
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

interface GroupModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  group?: GroupModel;
  aim?: string;
}

export const GroupModal: React.FC<GroupModalProps> = ({
  isModalVisible,
  onBackdropClick,
  group,
  aim,
}) => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(reducer, {
    group: group?.group || '',
    isButtonDisabled: false,
    helperText: '',
    isError: false,
  });

  const handleAIM = (): void => {
    if (aim === 'Add') {
      axios
        .post(`/api/group/`, {
          withCredentials: true,
          group: state.group,
          owner: user.id,
        })
        .then(() => {
          dispatch({
            type: 'ChangeSuccess',
            payload: `Group ${aim}ed Successfully`,
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
        .put(`/api/group/${group?.id}/`, {
          withCredentials: true,
          group: state.group,
          owner: user.id,
        })
        .then(() => {
          dispatch({
            type: 'ChangeSuccess',
            payload: `Group ${aim}ed Successfully`,
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

  const handleGroupChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch({
      type: 'setGroup',
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
            <CardHeader className={classes.header} title={`${aim} Group`} />
            <CardContent>
              <div>
                <TextField
                  error={state.isError}
                  fullWidth
                  id='group_name'
                  label='Group Name'
                  placeholder={state?.group || 'Name'}
                  defaultValue={state?.group}
                  margin='normal'
                  onChange={handleGroupChange}
                />
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
