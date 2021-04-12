import React, { FC, ReactElement, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import UpdateIcon from '@material-ui/icons/Update';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { CItoolModel, defaultCItool } from '../model/CItool.model';
import StateRow from './StateRow';
import axios from 'axios';
import { Button } from '@material-ui/core';
import SettingsRow from './SettingsRow';

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
interface PropsR {
  CItool: CItoolModel;
}

const Row: FC<PropsR> = ({ CItool }): ReactElement => {
  const [openModule, setOpenModule] = React.useState(true);
  const classes = useStyles();

  const handleDelete = (): void => {
    axios.delete(`http://127.0.0.1:8000/api/ci/${CItool.id}/`, {
      withCredentials: true,
    });
    window.location.replace('/ci-tools');
  };

  if (CItool.jobs.length === 0) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell style={{ width: '62px' }}></TableCell>
          <TableCell>{CItool.id}</TableCell>
          <TableCell>{CItool.ci}</TableCell>
          <TableCell>{CItool.link}</TableCell>
          <TableCell>{CItool.access}</TableCell>
          <TableCell>{CItool.owner || 'undefined'}</TableCell>
          <TableCell>{CItool.type}</TableCell>
          <TableCell>
            <Button variant='contained' color='primary'>
              Add Job
            </Button>
          </TableCell>
          <TableCell>
            <Button variant='contained' color='primary'>
              Update
            </Button>
          </TableCell>
          <TableCell>
            <Button variant='contained' onClick={handleDelete}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
        <TableBody />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{ width: '62px' }}>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpenModule(!openModule)}
            style={{ color: 'white' }}
          >
            {openModule ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{CItool.id}</TableCell>
        <TableCell>{CItool.ci}</TableCell>
        <TableCell>{CItool.link}</TableCell>
        <TableCell>{CItool.access}</TableCell>
        <TableCell>{CItool.owner || 'undefined'}</TableCell>
        <TableCell>{CItool.type}</TableCell>
        <TableCell>
          <Button variant='contained' color='primary'>
            Add Job
          </Button>
        </TableCell>
        <TableCell>
          <Button variant='contained' color='primary'>
            Update
          </Button>
        </TableCell>
        <TableCell>
          <Button variant='contained' onClick={handleDelete}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow className={classes.content}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={openModule} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='jobs'>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Path</TableCell>
                    <TableCell>CI ID</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ paddingRight: 0 }} align='right'>
                      Update
                    </TableCell>
                    <TableCell style={{ paddingRight: 0 }} align='right'>
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CItool.jobs.map((childrenRow) => (
                    <SettingsRow jobRow={childrenRow} />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

// define interface to represent component props
interface PropsCT {
  CItools: CItoolModel[];
}

const StateCollapsibleTable: FC<PropsCT> = ({ CItools }): ReactElement => {
  const classes = useStyles();
  return (
    <Table size='small' aria-label='jobs'>
      <TableHead>
        <TableRow className={classes.root}>
          <TableCell></TableCell>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Link</TableCell>
          <TableCell>Access</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Add Job</TableCell>
          <TableCell>Update</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {CItools.map((CItool) => (
          <Row key={CItool.ci} CItool={CItool} />
        ))}
      </TableBody>
    </Table>
  );
};

export default StateCollapsibleTable;
