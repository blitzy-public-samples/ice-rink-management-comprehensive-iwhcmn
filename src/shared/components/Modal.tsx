import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
  width: ${({ size }) => {
    switch (size) {
      case 'small':
        return '300px';
      case 'large':
        return '800px';
      default:
        return '500px';
    }
  }};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const ModalBody = styled.div`
  padding: 0 10px;
`;

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
}) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent size={size}>
        <ModalHeader>
          <h2>{title}</h2>
          <Button onClick={onClose}>Close</Button>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
};

// Human tasks:
// TODO: Review the modal component design and functionality to ensure it meets the specific requirements of the Ice Rink Management and Booking System
// TODO: Implement accessibility features such as focus trapping and keyboard navigation within the modal
// TODO: Consider adding animation for smooth opening and closing of the modal