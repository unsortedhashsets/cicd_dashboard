import { RWDModal } from '../../model/RWDModal';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import axios from 'axios';

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
      width: 400,
      background: `${theme.palette.primary.main}`,
      marginTop: theme.spacing(0),
    },
  })
);

interface DeleteModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  id: number;
  aim: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isModalVisible,
  onBackdropClick,
  id,
  aim,
}) => {
  const classes = useStyles();

  const handleDelete = (): void => {
    axios
      .delete(`http://127.0.0.1:8000/api/${aim}/${id}/`, {
        withCredentials: true,
      })
      .then(() => {
        onBackdropClick();
        window.location.reload();
      });
  };

  return (
    <RWDModal
      onBackdropClick={onBackdropClick}
      isModalVisible={isModalVisible}
      content={
        <form className={classes.container} noValidate autoComplete='off'>
          <Card className={classes.card}>
            <CardHeader className={classes.header} title={`Delete ${aim}?`} />
            <CardContent>
              <Typography align='center'>Are you sure?</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant='contained'
                size='large'
                color='secondary'
                className={classes.Btn}
                onClick={handleDelete}
              >
                Delete {aim}
              </Button>
            </CardActions>
          </Card>
        </form>
      }
    />
  );
};
