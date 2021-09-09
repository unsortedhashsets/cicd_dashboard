import { FC, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// constants
import { APP_TITLE, PAGE_TITLE_TOKENS } from '../utils/constants';
import { GroupModel } from '../model/Group.model';
import axios from 'axios';
import GroupTable from '../components/GroupTable';

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

const Groups: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [groupModels, setGroupsList] = useState<GroupModel[]>([]);

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
          {PAGE_TITLE_TOKENS} | {APP_TITLE}
        </title>
      </Helmet>
      <div className={classes.root}>
        <GroupTable groups={groupModels} />
      </div>
    </>
  );
};

export default Groups;
