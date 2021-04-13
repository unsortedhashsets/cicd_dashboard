import { FC, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

// constants
import { APP_TITLE, PAGE_TITLE_CI_TOOLS } from '../utils/constants';
import { CItoolModel } from '../model/CItool.model';
import axios from 'axios';
import SettingsCollapsibleTable from '../components/SettingsCollapsibleTable';
import { Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import { CIModal } from '../components/Modals/CIModal';
import { user } from '../model/User.model';

// define css-in-js
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })
);

const CITools: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };
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
        <Button
          variant='contained'
          color='secondary'
          onClick={toggleModal}
          disabled={!user.isLogin}
        >
          Add CI tool
        </Button>
        <CIModal
          isModalVisible={isModalVisible}
          onBackdropClick={toggleModal}
          aim='Add'
        />
        <SettingsCollapsibleTable CItools={CItoolModels} />
      </div>
    </>
  );
};

export default CITools;
