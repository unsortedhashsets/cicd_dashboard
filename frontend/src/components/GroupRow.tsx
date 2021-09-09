import { Button, TableCell, TableRow } from '@material-ui/core';
import { FC, ReactElement, useState } from 'react';
import { GroupModel } from '../model/Group.model';
import { user } from '../model/User.model';
import { DeleteModal } from './Modals/DeleteModal';
import { GroupModal } from './Modals/GroupModal';

interface Props {
  groupRow: GroupModel;
}

const GroupRow: FC<Props> = ({ groupRow }): ReactElement => {
  const [isModalUpdateGroupVisible, setIsModalUpdateGroupVisible] =
    useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const toggleDeleteModal = () => {
    setIsModalDeleteVisible((wasModalVisible) => !wasModalVisible);
  };
  const toggleUpdateGroupModal = () => {
    setIsModalUpdateGroupVisible((wasModalVisible) => !wasModalVisible);
  };

  return (
    <TableRow key={groupRow.id}>
      <TableCell style={{ width: '62px' }} />
      <TableCell>{groupRow.id}</TableCell>
      <TableCell>{groupRow.group}</TableCell>
      <TableCell>{groupRow.owner_name || 'undefined'}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={toggleUpdateGroupModal}
          disabled={!user.isLogin}
        >
          Update
        </Button>
        <GroupModal
          isModalVisible={isModalUpdateGroupVisible}
          onBackdropClick={toggleUpdateGroupModal}
          aim='Update'
          group={groupRow}
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
          aim='group'
          id={groupRow.id}
        />
      </TableCell>
    </TableRow>
  );
};

export default GroupRow;
