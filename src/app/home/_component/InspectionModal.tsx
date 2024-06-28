import styled from 'styled-components';

import Modal from '@/share/ui/modal/Modal';
import useModal from '@/share/ui/modal/useModal';

export default function InspectionModal() {
  const { isModalOpen, closeModal } = useModal(true);

  return (
    <>
      <Modal isVisible={isModalOpen} onClose={closeModal}>
        <Title>서버 점검 중</Title>
        <Description>2024.06.28 ~ 2024.06.30 오후</Description>
      </Modal>
    </>
  );
}

const Title = styled.div`
  margin-bottom: 10px;

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;
const Description = styled.div`
  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
