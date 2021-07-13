import {
  createStyles,
  IconButton,
  Link,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  CircularProgress,
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
  const [jobStatus, setJobStatusModel] = useState<JobStatusModel>(
    defaultJobStatusModel
  );

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
  } else if (jobStatus?.buildStatus === 'UNSTABLE') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `${theme.palette.warning.light}`,
          },
        },
      })
    );
  } else if (jobStatus?.buildStatus === 'ABORTED') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `#AAAAAA`,
          },
        },
      })
    );
  }

  const handleUpdate = (): void => {
    setJobStatusModel(defaultJobStatusModel);
    axios
      .get<JobStatusModel>(`/api/job/${jobRow.id}/status/`, {
        withCredentials: true,
      })
      .then((response) => {
        setJobStatusModel(response.data);
      });
  };

  useEffect(() => {
    setJobStatusModel(defaultJobStatusModel);
    axios
      .get<JobStatusModel>(`/api/job/${jobRow.id}/status`, {
        withCredentials: true,
      })
      .then((response) => {
        setJobStatusModel(response.data);
      });

    return () => {};
  }, [jobRow.id]);

  return (
    <TableRow key={jobRow.ci} className={useStyles().jobRow}>
      <TableCell component='th' scope='row'>
        {jobStatus?.buildStatus === '' ? <CircularProgress /> : `${jobRow.id}`}
      </TableCell>
      <TableCell>{jobStatus?.name}</TableCell>
      <TableCell>
        <Link
          color='inherit'
          href={jobStatus?.jobUrl || '/'}
          target='_blank'
          rel='noreferrer'
        >
          {jobStatus?.jobUrl === '' ? '' : 'Job'}
        </Link>
      </TableCell>
      <TableCell>
        <Link
          color='inherit'
          href={jobStatus?.buildUrl || '/'}
          target='blank'
          rel='noreferrer'
        >
          {jobStatus?.buildUrl === '' ? '' : 'Build'}
        </Link>
      </TableCell>
      <TableCell>{jobStatus?.buildNumber}</TableCell>
      <TableCell>
        {jobStatus?.buildStatus === '' ? (
          ''
        ) : (
          <IconButton>
            <UpdateIcon onClick={handleUpdate} />
          </IconButton>
        )}
      </TableCell>
      <TableCell>{jobStatus?.buildStatus}</TableCell>
    </TableRow>
  );
};

export default StateRow;
