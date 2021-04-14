import { FC, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// axios

import { CItoolModel } from '../model/CItool.model';

// constants
import { API_IP, APP_TITLE, PAGE_TITLE_DASHBOARD } from '../utils/constants';
import axios from 'axios';
import StateCollapsibleTable from '../components/StateCollapsibleTable';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
);

const Dashboard: FC<{}> = (): ReactElement => {
  const classes = useStyles();

  const [CItoolModels, setCItoolsList] = useState<CItoolModel[]>([]);

  useEffect(() => {
    axios
      .get<CItoolModel[]>(`${API_IP}/api/ci/`, {
        withCredentials: true,
      })
      .then((response) => {
        setCItoolsList(response.data);
      });
    return () => {};
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_DASHBOARD} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <StateCollapsibleTable CItools={CItoolModels} />
      </div>
    </>
  );
};

export default Dashboard;
