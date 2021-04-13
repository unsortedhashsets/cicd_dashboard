import React, { FC, ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { TokenModel } from '../model/Token.model';
import { Button } from '@material-ui/core';
import { TokenModal } from './TokenModal';

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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const handleDelete = (id: number): void => {
    axios.delete(`http://127.0.0.1:8000/api/token/${id}/`, {
      withCredentials: true,
    });
    window.location.replace('/tokens');
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
              <Button variant='contained' color='primary' onClick={toggleModal}>
                Add Token
              </Button>
              <TokenModal
                isModalVisible={isModalVisible}
                onBackdropClick={toggleModal}
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
            <Button variant='contained' color='primary' onClick={toggleModal}>
              Add Token
            </Button>
            <TokenModal
              isModalVisible={isModalVisible}
              onBackdropClick={toggleModal}
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
                  onClick={toggleModal}
                >
                  Update
                </Button>
                <TokenModal
                  isModalVisible={isModalVisible}
                  onBackdropClick={toggleModal}
                  aim='Update'
                  token={token}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => handleDelete(token.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TokenTable;
