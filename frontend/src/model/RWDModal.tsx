import React from 'react';
import MediaQuery from 'react-responsive';
import {
  BaseModalWrapper,
  BaseModalWrapperProps,
} from '../components/BaseModalWrapper';
import {
  DesktopCloseButton,
  DesktopModalContainer,
} from '../theme/ModalPopup.styles';

type RWDModalProps = BaseModalWrapperProps;

export const RWDModal: React.FC<RWDModalProps> = (props) => {
  return (
    <MediaQuery minWidth={580}>
      {(matches) =>
        matches ? (
          <BaseModalWrapper
            CloseButtonComponent={DesktopCloseButton}
            ContainerComponent={DesktopModalContainer}
            {...props}
          ></BaseModalWrapper>
        ) : (
          ''
        )
      }
    </MediaQuery>
  );
};
