import classes from './Modal.module.scss';
import React from 'react';
import { HTMLAttributes, useEffect, useRef } from 'react';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

interface ModalWrapperProps extends HTMLAttributes<HTMLDivElement> {
  isVisible: boolean;
}

export interface ModalProps extends ModalWrapperProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export const Modal = ({ children, isVisible, title, onClose }: ModalProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const closeModalOnOutside = (event: any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        onClose();
      }
      document.addEventListener('mousedown', closeModalOnOutside);
      return () => {
        document.removeEventListener('mousedown', closeModalOnOutside);
      };
    };
  }, [boxRef]);
  return (
    isVisible && (
      <div className={classes.modal_wrapper} ref={boxRef}>
        <div className={classes.modal}>
          <header className={classes.heading}>
            <span />
            <h2>{title}</h2>
            <Button onClick={onClose} size="large" variant="close">
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </header>
          <section>{children}</section>
        </div>
      </div>
    )
  );
};
