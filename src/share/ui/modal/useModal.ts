import { useState } from 'react';

export default function useModal(initialState?: boolean) {
  const [isModalOpen, setIsModalOpen] = useState(
    initialState ? initialState : false,
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen: isModalOpen,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };
}
