import React, { FC, ReactElement, useState } from 'react';
import {
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  IconButton,
  Collapse,
  Box,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SettingsRow from './SettingsRow';
import { CIModal } from './Modals/CIModal';
import { JobModal } from './Modals/JobModal';
import { DeleteModal } from './Modals/DeleteModal';
import { CItoolModel } from '../model/CItool.model';
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
interface PropsR {
  CItool: CItoolModel;
}

const Row: FC<PropsR> = ({ CItool }): ReactElement => {
  const [openModule, setOpenModule] = React.useState(true);
  const classes = useStyles();

  const [isCIModalVisible, setIsCIModalVisible] = useState(false);
  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const toggleCIModal = () => {
    setIsCIModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const toggleJobModal = () => {
    setIsJobModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const toggleDeleteModal = () => {
    setIsModalDeleteVisible((wasModalVisible) => !wasModalVisible);
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
          <TableCell align='center'>
            <Button
              variant='contained'
              color='primary'
              onClick={toggleJobModal}
              disabled={!user.isLogin}
            >
              Add Job
            </Button>
            <JobModal
              isModalVisible={isJobModalVisible}
              onBackdropClick={toggleJobModal}
              aim='Add'
              ci={CItool}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={toggleCIModal}
              disabled={!user.isLogin}
            >
              Update
            </Button>
            <CIModal
              isModalVisible={isCIModalVisible}
              onBackdropClick={toggleCIModal}
              aim='Update'
              ci={CItool}
            />
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
              aim='ci'
              id={CItool.id}
            />
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
        <TableCell align='center'>
          <Button
            style={{ marginLeft: '15px' }}
            variant='contained'
            color='primary'
            onClick={toggleJobModal}
            disabled={!user.isLogin}
          >
            Add Job
          </Button>
          <JobModal
            isModalVisible={isJobModalVisible}
            onBackdropClick={toggleJobModal}
            aim='Add'
            ci={CItool}
          />
          <Button
            style={{ marginLeft: '15px' }}
            variant='contained'
            color='primary'
            onClick={toggleCIModal}
            disabled={!user.isLogin}
          >
            Update
          </Button>
          <CIModal
            isModalVisible={isCIModalVisible}
            onBackdropClick={toggleCIModal}
            aim='Update'
            ci={CItool}
          />
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
            aim='ci'
            id={CItool.id}
          />
        </TableCell>
      </TableRow>
      <TableRow className={classes.content}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={openModule} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='jobs'>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 50 }}></TableCell>
                    <TableCell style={{ width: 350 }}>Name</TableCell>
                    <TableCell style={{ width: 500 }}>Path</TableCell>
                    <TableCell>CI ID</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align='center'>Commands</TableCell>
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
          <TableCell align='center'>Commands</TableCell>
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
