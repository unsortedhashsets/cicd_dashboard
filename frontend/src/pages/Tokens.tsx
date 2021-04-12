import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// components
import PageTitle from '../components/PageTitle';

// constants
import { APP_TITLE, PAGE_TITLE_TOKENS } from '../utils/constants';
import { TokenModel } from '../model/Token.model';
import axios from 'axios';
import TokenTable from '../components/TokenTable';

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

const Tokens: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [tokenModels, setTokenList] = useState<TokenModel[]>([]);

  useEffect(() => {
    axios
      .get<TokenModel[]>('http://127.0.0.1:8000/api/token/', {
        withCredentials: true,
      })
      .then((response) => {
        setTokenList(response.data);
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
        <TokenTable tokens={tokenModels} />
      </div>
    </>
  );
};

export default Tokens;
