import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CollapsibleTable from '../components/CollapsibleTable';

// axios

import { CItoolModel } from '../model/CItool.model';

// constants
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from '../utils/constants';
import axios from 'axios';

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
      .get<CItoolModel[]>('http://localhost:8000/api/ci/')
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
        <CollapsibleTable rows={CItoolModels} />
      </div>
    </>
  );
};

export default Dashboard;
