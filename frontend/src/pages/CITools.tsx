import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// components

// constants
import { APP_TITLE, PAGE_TITLE_CI_TOOLS } from '../utils/constants';
import { CItoolModel } from '../model/CItool.model';
import axios from 'axios';
import SettingsCollapsibleTable from '../components/SettingsCollapsibleTable';

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

const CITools: FC<{}> = (): ReactElement => {
  const classes = useStyles();

  const [CItoolModels, setCItoolsList] = useState<CItoolModel[]>([]);

  useEffect(() => {
    axios
      .get<CItoolModel[]>('http://127.0.0.1:8000/api/ci/', {
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
          {PAGE_TITLE_CI_TOOLS} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <SettingsCollapsibleTable CItools={CItoolModels} />
      </div>
    </>
  );
};

export default CITools;
