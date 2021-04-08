import {
  createStyles,
  IconButton,
  Link,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
} from '@material-ui/core';
import axios from 'axios';
import { FC, ReactElement, useEffect, useState } from 'react';
import {
  JobStatusModel,
  JobModel,
  defaultJobStatusModel,
} from '../model/Job.model';
import UpdateIcon from '@material-ui/icons/Update';

const StateRow: FC<{ jobRow: JobModel }> = ({ jobRow }): ReactElement => {
  const [links, setLinks] = useState<string[]>(['', '']);
  const [jobStatus, setJobStatusModel] = useState<JobStatusModel>();

  var useStyles = makeStyles((theme: Theme) =>
    createStyles({
      jobRow: {
        '& > *': {},
      },
    })
  );

  if (jobStatus?.buildStatus === 'FAILURE') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `${theme.palette.error.light}`,
          },
        },
      })
    );
  } else if (jobStatus?.buildStatus === 'SUCCESS') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `${theme.palette.success.light}`,
          },
        },
      })
    );
  }

  const handleUpdate = (): void => {
    setJobStatusModel(defaultJobStatusModel);
    setLinks(['', '']);
    axios
      .get<JobStatusModel>(`http://localhost:8000/api/job/${jobRow.id}/status/`)
      .then((response) => {
        setJobStatusModel(response.data);
      })
      .then(() => {
        if (jobStatus?.buildUrl === '' || jobStatus?.jobUrl === '') {
          setLinks(['', '']);
        } else {
          setLinks(['Job', 'Build']);
        }
      });
  };

  useEffect(() => {
    axios
      .get<JobStatusModel>(`http://localhost:8000/api/job/${jobRow.id}/status`)
      .then((response) => {
        setJobStatusModel(response.data);
      })
      .then(() => {
        if (jobStatus?.buildUrl === '' || jobStatus?.jobUrl === '') {
          setLinks(['', '']);
        } else {
          setLinks(['Job', 'Build']);
        }
      });
    return () => {};
  }, [jobRow.id]);

  return (
    <TableRow key={jobRow.ci} className={useStyles().jobRow}>
      <TableCell component='th' scope='row'>
        {jobRow.id}
      </TableCell>
      <TableCell>{jobStatus?.name}</TableCell>
      <TableCell>
        <Link
          color='inherit'
          href={jobStatus?.jobUrl || '/'}
          target='_blank'
          rel='noreferrer'
        >
          {links[0]}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          color='inherit'
          href={jobStatus?.buildUrl || '/'}
          target='blank'
          rel='noreferrer'
        >
          {links[1]}
        </Link>
      </TableCell>
      <TableCell>{jobStatus?.buildNumber}</TableCell>
      <TableCell>
        <IconButton>
          <UpdateIcon onClick={handleUpdate} />
        </IconButton>
      </TableCell>
      <TableCell>{jobStatus?.buildStatus}</TableCell>
    </TableRow>
  );
};

export default StateRow;
