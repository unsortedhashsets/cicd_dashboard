import { FC, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// axios

import { CItoolModel } from '../model/CItool.model';

// constants
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from '../utils/constants';
import axios from 'axios';
import StateCollapsibleTable from '../components/StateCollapsibleTable';
import { GroupModel } from '../model/Group.model';

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
  const [GroupsModels, setGroupsList] = useState<GroupModel[]>([]);

  useEffect(() => {
    axios
      .get<CItoolModel[]>(`/api/ci/`, {
        withCredentials: true,
      })
      .then((response) => {
        setCItoolsList(response.data);
      });
    return () => {};
  }, []);

  useEffect(() => {
    axios
      .get<GroupModel[]>(`/api/group/`, {
        withCredentials: true,
      })
      .then((response) => {
        setGroupsList(response.data);
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
        <StateCollapsibleTable CItools={CItoolModels} Groups={GroupsModels} />
      </div>
    </>
  );
};

export default Dashboard;
