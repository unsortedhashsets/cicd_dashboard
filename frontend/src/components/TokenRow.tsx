import { Button, TableCell, TableRow } from '@material-ui/core';
import { FC, ReactElement, useState } from 'react';
import { TokenModel } from '../model/Token.model';
import { user } from '../model/User.model';
import { DeleteModal } from './Modals/DeleteModal';
import { TokenModal } from './Modals/TokenModal';

interface Props {
  tokenRow: TokenModel;
}

const TokenRow: FC<Props> = ({ tokenRow }): ReactElement => {
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalUpdateTokenVisible, setIsModalUpdateTokenVisible] =
    useState(false);

  const toggleUpdateTokenModal = () => {
    setIsModalUpdateTokenVisible((wasModalVisible) => !wasModalVisible);
  };

  const toggleDeleteModal = () => {
    setIsModalDeleteVisible((wasModalVisible) => !wasModalVisible);
  };

  return (
    <TableRow key={tokenRow.id}>
      <TableCell style={{ width: '62px' }} />
      <TableCell>{tokenRow.id}</TableCell>
      <TableCell>{tokenRow.ci}</TableCell>
      <TableCell>{tokenRow.access}</TableCell>
      <TableCell>{tokenRow.token}</TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Button
          variant='contained'
          color='primary'
          onClick={toggleUpdateTokenModal}
          disabled={!user.isLogin}
        >
          Update
        </Button>
        <TokenModal
          isModalVisible={isModalUpdateTokenVisible}
          onBackdropClick={toggleUpdateTokenModal}
          aim='Update'
          token={tokenRow}
        />
      </TableCell>
      <TableCell>
        <Button
          style={{ marginLeft: '15px' }}
          variant='contained'
          color='secondary'
          onClick={toggleDeleteModal}
          disabled={!user.isLogin}
        >
          Delete
        </Button>
        <DeleteModal
          isModalVisible={isModalDeleteVisible}
          onBackdropClick={toggleDeleteModal}
          aim='token'
          id={tokenRow.id}
        />
      </TableCell>
    </TableRow>
  );
};

export default TokenRow;
