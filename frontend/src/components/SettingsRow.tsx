import { Button, TableCell, TableRow } from '@material-ui/core';
import axios from 'axios';
import { FC, ReactElement } from 'react';
import { JobModel } from '../model/Job.model';

interface Props {
  jobRow: JobModel;
}

const SettingsRow: FC<Props> = ({ jobRow }): ReactElement => {
  const handleDelete = (): void => {
    axios
      .delete(`http://127.0.0.1:8000/api/job/${jobRow.id}/`, {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
      });
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
        <Button variant='contained' color='primary'>
          Update
        </Button>
        <Button
          style={{ marginLeft: '15px' }}
          variant='contained'
          color='secondary'
          onClick={handleDelete}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SettingsRow;
