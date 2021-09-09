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
import { GroupModal } from './Modals/GroupModal';
import { GroupModel } from '../model/Group.model';
import { user } from '../model/User.model';
import GroupRow from './GroupRow';

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
  groups: GroupModel[];
}

const GroupTable: FC<PropsCT> = ({ groups }): ReactElement => {
  const classes = useStyles();

  const [isModalAddGroupVisible, setIsModalAddGroupVisible] = useState(false);

  const toggleAddGroupModal = () => {
    setIsModalAddGroupVisible((wasModalVisible) => !wasModalVisible);
  };

  if (groups.length === 0) {
    return (
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead></TableHead>
          <TableRow className={classes.root}>
            <TableCell style={{ width: '62px' }} />
            <TableCell>Group ID</TableCell>
            <TableCell>CI ID</TableCell>
            <TableCell>User ID</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>
              <Button
                variant='contained'
                color='primary'
                onClick={toggleAddGroupModal}
                disabled={!user.isLogin}
              >
                Add Group
              </Button>
              <GroupModal
                isModalVisible={isModalAddGroupVisible}
                onBackdropClick={toggleAddGroupModal}
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
          <TableCell>Group ID</TableCell>
          <TableCell>Group Name</TableCell>
          <TableCell>owner</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Button
              variant='contained'
              color='primary'
              onClick={toggleAddGroupModal}
              disabled={!user.isLogin}
            >
              Add Group
            </Button>
            <GroupModal
              isModalVisible={isModalAddGroupVisible}
              onBackdropClick={toggleAddGroupModal}
              aim='Add'
            />
          </TableCell>
          <TableCell align='center'>Commands</TableCell>
        </TableRow>
        <TableBody className={classes.content}>
          {groups.map((childrenRow) => (
            <GroupRow groupRow={childrenRow} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupTable;
