import React, { FC, ReactElement, useEffect, useReducer } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core/';
import UpdateIcon from '@material-ui/icons/Update';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { CItoolModel } from '../model/CItool.model';
import StateRow from './StateRow';
import useLocalStorage from '../utils/useLocalStorage';

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
  open_c: boolean | null;
}

const StateCollapsibleTableCIRow: FC<PropsR> = ({
  _CItool,
  open_c,
}): ReactElement => {
  const classes = useStyles();

  const [isTableOpen, setTableOpen] = useLocalStorage(
    'CI_' + String(_CItool.id),
    true
  );

  useEffect(() => {
    if (open_c != null) {
      setTableOpen(open_c);
    }
  }, [open_c]);

  const toggleTable = () => {
    setTableOpen((prevValue) => !prevValue);
  };

  const [force, forceUpdate] = useReducer((x) => x + 1, 0);

  if (_CItool.jobs.length === 0) {
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell style={{ width: '62px' }} />
          <TableCell style={{ color: 'white' }}>{_CItool.ci}</TableCell>
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
        <TableCell style={{ color: 'white' }}>{_CItool.ci}</TableCell>
        <TableCell align='right'>
          <IconButton>
            <UpdateIcon onClick={forceUpdate} />
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
                  {_CItool.jobs.map((childrenRow) => (
                    <StateRow
                      jobRow={childrenRow}
                      pictures={false}
                      update={force}
                    />
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

export default StateCollapsibleTableCIRow;
