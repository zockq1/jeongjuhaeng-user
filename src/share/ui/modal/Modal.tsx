import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isVisible?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id === 'overlay') {
      onClose();
    }
  };

  return (
    <Overlay id="overlay" onClick={handleOverlayClick}>
      <ModalContent>
        {children}
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalContent>
    </Overlay>
  );
}

const Overlay = styled.div`
  display: flex;
  position: fixed;

  width: 100vw;
  height: 100vh;

  background-color: rgb(0 0 0 / 50%);

  inset: 0;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 150;

  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgb(0 0 0 / 25%);

  background-color: white;

  text-align: center;

  transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;