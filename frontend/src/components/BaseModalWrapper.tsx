import React from 'react';
import { ReactNode } from 'react';
import { MouseEventHandler } from 'react';
import { Modal } from '../model/Modal.model';
import { CloseSign } from '../theme/ModalPopup.styles';

export interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  content?: ReactNode;
}

interface ComponentsProps {
  ContainerComponent: React.ComponentType<{}>;
  CloseButtonComponent: React.ComponentType<{
    onClick?: MouseEventHandler<any>;
  }>;
}

type Props = BaseModalWrapperProps & ComponentsProps;

export const BaseModalWrapper: React.FC<Props> = ({
  onBackdropClick,
  isModalVisible,
  ContainerComponent,
  CloseButtonComponent,
  content,
}) => {
  if (!isModalVisible) {
    return null;
  }
  return (
    <Modal onBackdropClick={onBackdropClick}>
      <ContainerComponent>
        <CloseButtonComponent onClick={onBackdropClick}>
          <CloseSign />
        </CloseButtonComponent>
        {content}
      </ContainerComponent>
    </Modal>
  );
};
