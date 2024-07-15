import React from 'react';
import Modal from 'react-modal';
import { Laureate } from '../hooks/useNobelPrizes';

Modal.setAppElement('#root'); // For accessibility

interface LaureateModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  laureate: Laureate | null;
}

const LaureateModal: React.FC<LaureateModalProps> = ({ isOpen, onRequestClose, laureate }) => {
  if (!laureate) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Laureate Details">
      <h2>{laureate.firstname} {laureate.surname}</h2>
      <p><strong>Category:</strong> {laureate.category}</p>
      <p><strong>Year:</strong> {laureate.year}</p>
      <p><strong>Motivation:</strong> {laureate.motivation}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default LaureateModal;
