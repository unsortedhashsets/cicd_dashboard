import { Button, TableCell, TableRow, Theme } from '@material-ui/core';
import axios from 'axios';
import { FC, ReactElement } from 'react';
import { JobModel } from '../model/Job.model';

interface Props {
  jobRow: JobModel;
}

const SettingsRow: FC<Props> = ({ jobRow }): ReactElement => {
  const handleDelete = (): void => {
    axios.delete(`http://127.0.0.1:8000/api/job/${jobRow.id}/`, {
      withCredentials: true,
    });
    window.location.replace('/ci-tools');
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
      <TableCell style={{ paddingRight: 0 }} align='right'>
        <Button variant='contained' color='primary'>
          Update
        </Button>
      </TableCell>
      <TableCell style={{ paddingRight: 0 }} align='right'>
        <Button variant='contained' color='secondary' onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SettingsRow;
