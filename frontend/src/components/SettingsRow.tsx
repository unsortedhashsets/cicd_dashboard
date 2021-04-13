import { Button, TableCell, TableRow } from '@material-ui/core';
import React, { FC, ReactElement, useState } from 'react';
import { JobModel } from '../model/Job.model';
import { user } from '../model/User.model';
import { DeleteModal } from './Modals/DeleteModal';
import { JobModal } from './Modals/JobModal';

interface Props {
  jobRow: JobModel;
}

const SettingsRow: FC<Props> = ({ jobRow }): ReactElement => {
  const [isJobModalVisible, setIsJobModalVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const toggleDeleteModal = () => {
    setIsModalDeleteVisible((wasModalVisible) => !wasModalVisible);
  };
  const toggleJobModal = () => {
    setIsJobModalVisible((wasModalVisible) => !wasModalVisible);
  };

  return (
    <TableRow key={jobRow.ci}>
      <TableCell component='th' scope='row'>
        {jobRow.id}
      </TableCell>
      <TableCell>{jobRow.job}</TableCell>
      <TableCell>{jobRow.path}</TableCell>
      <TableCell>{jobRow.ci}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell align='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={toggleJobModal}
          disabled={!user.isLogin}
        >
          Update
        </Button>
        <JobModal
          isModalVisible={isJobModalVisible}
          onBackdropClick={toggleJobModal}
          aim='Update'
          job={jobRow}
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
          aim='job'
          id={jobRow.id}
        />
      </TableCell>
    </TableRow>
  );
};

export default SettingsRow;
