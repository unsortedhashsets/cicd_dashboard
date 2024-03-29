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
import { TokenModel } from '../model/Token.model';
import { user } from '../model/User.model';
import TokenRow from './TokenRow';

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

  const [isModalAddTokenVisible, setIsModalAddTokenVisible] = useState(false);

  const toggleAddTokenModal = () => {
    setIsModalAddTokenVisible((wasModalVisible) => !wasModalVisible);
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
                onClick={toggleAddTokenModal}
                disabled={!user.isLogin}
              >
                Add Token
              </Button>
              <TokenModal
                isModalVisible={isModalAddTokenVisible}
                onBackdropClick={toggleAddTokenModal}
                aim='Add'
              />
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
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
          <TableCell>Access</TableCell>
          <TableCell>Token</TableCell>
          <TableCell>
            <Button
              variant='contained'
              color='primary'
              onClick={toggleAddTokenModal}
              disabled={!user.isLogin}
            >
              Add Token
            </Button>
            <TokenModal
              isModalVisible={isModalAddTokenVisible}
              onBackdropClick={toggleAddTokenModal}
              aim='Add'
            />
          </TableCell>
          <TableCell>Update</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
        <TableBody className={classes.content}>
          {tokens.map((childrenRow) => (
            <TokenRow tokenRow={childrenRow} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TokenTable;
