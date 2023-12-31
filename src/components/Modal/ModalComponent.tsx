// src/components/ModalComponent.tsx
import React from 'react';
import ReactModal from 'react-modal';
import styles from './ModalComponent.module.css';

ReactModal.setAppElement('#root');

interface ModalComponentProps {
  isOpen: boolean;
  contentLabel: string;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({isOpen, contentLabel, onRequestClose, children}) => {
  return (<ReactModal
    isOpen={isOpen}
    contentLabel={contentLabel}
    onRequestClose={onRequestClose}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    <button className={styles.closeButton} onClick={onRequestClose}>
      ✕
    </button>
    {children}
  </ReactModal>);
};

export default ModalComponent;
