import React, { FC, ReactElement, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core/';
import UpdateIcon from '@material-ui/icons/Update';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { CItoolModel, defaultCItool } from '../model/CItool.model';
import StateRow from './StateRow';
import axios from 'axios';
import useLocalStorage from '../utils/useLocalStorage';
import { FormatColorResetOutlined } from '@material-ui/icons';

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
  _CItool: CItoolModel;
  open: boolean | null;
}

const Row: FC<PropsR> = ({ _CItool, open }): ReactElement => {
  const classes = useStyles();
  const [CItool, setCItool] = useState<CItoolModel>(_CItool);

  const [isTableOpen, setTableOpen] = useLocalStorage(String(_CItool.id), true);

  useEffect(() => {
    if (open != null) {
      setTableOpen(open);
      open = null;
    }
  }, [open]);

  const toggleTable = () => {
    setTableOpen((prevValue) => !prevValue);
  };

  const handleUpdate = (): void => {
    axios
      .get<CItoolModel>(`/api/ci/${CItool.id}/`, {
        withCredentials: true,
      })
      .then((response) => {
        setCItool(defaultCItool);
        setCItool(response.data);
      });
  };

  if (CItool.jobs.length === 0) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell style={{ width: '62px' }} />
          <TableCell style={{ color: 'white' }}>{CItool.ci}</TableCell>
          <TableCell></TableCell>
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
            onClick={toggleTable}
            style={{ color: 'white' }}
          >
            {isTableOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{ color: 'white' }}>{CItool.ci}</TableCell>
        <TableCell align='right'>
          <IconButton>
            <UpdateIcon onClick={handleUpdate} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow className={classes.content}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={isTableOpen} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='jobs'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 50 }}></TableCell>
                    <TableCell style={{ width: 350 }}>Job name</TableCell>
                    <TableCell>Job link</TableCell>
                    <TableCell>Last build link</TableCell>
                    <TableCell>Last build number</TableCell>
                    <TableCell>Commands</TableCell>
                    <TableCell>Last build status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {CItool.jobs.map((childrenRow) => (
                    <StateRow jobRow={childrenRow} />
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
  const [state, setState] = useState<boolean | null>(null);

  const closeState = () => {
    setState(false);
  };
  const openState = () => {
    setState(true);
  };

  return (
    <TableContainer component={Paper}>
      <Button
        style={{ marginBottom: '15px' }}
        variant='contained'
        color='secondary'
        onClick={closeState}
      >
        Close All
      </Button>
      <Button
        style={{ marginBottom: '15px', marginLeft: '15px' }}
        variant='contained'
        color='secondary'
        onClick={openState}
      >
        Open All
      </Button>
      <Table aria-label='collapsible table'>
        <TableHead></TableHead>
        <TableBody>
          {CItools.map((CItool) => (
            <Row key={CItool.ci} _CItool={CItool} open={state} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StateCollapsibleTable;
