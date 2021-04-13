import { FC, ReactElement, useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { TokenModal } from './Modals/TokenModal';
import { DeleteModal } from './Modals/DeleteModal';
import { TokenModel } from '../model/Token.model';
import { user } from '../model/User.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        background: `${theme.palette.primary.dark}`,
      },
    },
    content: {
      '& > *': {
        background: `${theme.palette.primary.light}`,
      },
    },
  })
);

// define interface to represent component props
interface PropsCT {
  tokens: TokenModel[];
}

const TokenTable: FC<PropsCT> = ({ tokens }): ReactElement => {
  const classes = useStyles();

  const [isModalTokenVisible, setIsModalTokenVisible] = useState(false);

  const toggleTokenModal = () => {
    setIsModalTokenVisible((wasModalVisible) => !wasModalVisible);
  };

  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const toggleDeleteModal = () => {
    setIsModalDeleteVisible((wasModalVisible) => !wasModalVisible);
  };

  if (tokens.length === 0) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead></TableHead>
          <TableRow className={classes.root}>
            <TableCell style={{ width: '62px' }} />
            <TableCell>Token ID</TableCell>
            <TableCell>CI ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Token</TableCell>
            <TableCell>
              <Button
                variant='contained'
                color='primary'
                onClick={toggleTokenModal}
                disabled={!user.isLogin}
              >
                Add Token
              </Button>
              <TokenModal
                isModalVisible={isModalTokenVisible}
                onBackdropClick={toggleTokenModal}
                aim='Add'
              />
            </TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead></TableHead>
        <TableRow className={classes.root}>
          <TableCell style={{ width: '62px' }} />
          <TableCell>Token ID</TableCell>
          <TableCell>CI ID</TableCell>
          <TableCell>User ID</TableCell>
          <TableCell>Token</TableCell>
          <TableCell>
            <Button
              variant='contained'
              color='primary'
              onClick={toggleTokenModal}
              disabled={!user.isLogin}
            >
              Add Token
            </Button>
            <TokenModal
              isModalVisible={isModalTokenVisible}
              onBackdropClick={toggleTokenModal}
              aim='Add'
            />
          </TableCell>
          <TableCell>Update</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
        <TableBody>
          {tokens.map((token) => (
            <TableRow className={classes.content}>
              <TableCell style={{ width: '62px' }} />
              <TableCell>{token.id}</TableCell>
              <TableCell>{token.ci}</TableCell>
              <TableCell>{token.user}</TableCell>
              <TableCell>{token.token}</TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={toggleTokenModal}
                  disabled={!user.isLogin}
                >
                  Update
                </Button>
                <TokenModal
                  isModalVisible={isModalTokenVisible}
                  onBackdropClick={toggleTokenModal}
                  aim='Update'
                  token={token}
                />
              </TableCell>
              <TableCell>
                <Button
                  style={{ marginLeft: '15px' }}
                  variant='contained'
                  color='secondary'
                  onClick={toggleDeleteModal}
                  disabled={!user.isLogin}
                >
                  Delete
                </Button>
                <DeleteModal
                  isModalVisible={isModalDeleteVisible}
                  onBackdropClick={toggleDeleteModal}
                  aim='token'
                  id={token.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TokenTable;
