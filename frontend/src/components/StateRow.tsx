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

const StateRow: FC<{
  jobRow: JobModel;
  pictures: boolean;
  update: number;
}> = ({ jobRow, pictures, update }): ReactElement => {
  const [jobStatus, setJobStatusModel] = useState<JobStatusModel>(
    defaultJobStatusModel
  );

  const [updateStatus, setUpdateStatus] = useState<number>(-1);

  const [time, setTime] = useState(Date.now());

  var Styles = makeStyles({
    img: {
      minWidth: '50px',
      maxWidth: '100%',
      maxHeight: 'auto',
    },
  });

  const classes = Styles();

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
  } else if (jobStatus?.buildStatus === 'FAILURE/RUNNING') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `linear-gradient(90deg, ${theme.palette.error.light}, ${theme.palette.primary.light} 100%);`,
            backgroundAttachment: `fixed;`,
          },
        },
      })
    );
  } else if (jobStatus?.buildStatus === 'SUCCESS/RUNNING') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `linear-gradient(90deg, ${theme.palette.success.light}, ${theme.palette.primary.light} 100%);`,
            backgroundAttachment: `fixed;`,
          },
        },
      })
    );
  } else if (jobStatus?.buildStatus === 'ABORTED/RUNNING') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `linear-gradient(90deg, #AAAAAA, ${theme.palette.primary.light} 100%);`,
            backgroundAttachment: `fixed;`,
          },
        },
      })
    );
  } else if (jobStatus?.buildStatus === 'UNSTABLE/RUNNING') {
    useStyles = makeStyles((theme: Theme) =>
      createStyles({
        jobRow: {
          '& > *': {
            background: `linear-gradient(90deg, ${theme.palette.warning.light}, ${theme.palette.primary.light} 100%);`,
            backgroundAttachment: `fixed;`,
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

  if (updateStatus !== update) {
    setUpdateStatus(update);
    handleUpdate();
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 300000);
    setJobStatusModel(defaultJobStatusModel);
    axios
      .get<JobStatusModel>(`/api/job/${jobRow.id}/status`, {
        withCredentials: true,
      })
      .then((response) => {
        setJobStatusModel(response.data);
      });
    return () => {
      clearInterval(interval);
    };
  }, [jobRow.id, time]);

  return (
    <TableRow key={(jobRow.ci, updateStatus)} className={useStyles().jobRow}>
      <TableCell component='th' scope='row' width='75px'>
        {jobStatus?.buildStatus === '' ? (
          <CircularProgress />
        ) : pictures ? (
          jobRow.type === 'JENKINS' ? (
            <img className={classes.img} src='./jenkins.png' alt='jenkins' />
          ) : jobRow.type === 'TRAVIS' ? (
            <img className={classes.img} src='./travis.png' alt='travis' />
          ) : jobRow.type === 'CIRCLE' ? (
            <img className={classes.img} src='./circle.png' alt='circle' />
          ) : (
            <img className={classes.img} src='./github.png' alt='github' />
          )
        ) : (
          `${jobRow.id}`
        )}
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
