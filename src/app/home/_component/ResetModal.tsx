import styled from 'styled-components';

import Modal from '@/share/ui/modal/Modal';
import useModal from '@/share/ui/modal/useModal';

import { useResetUserDataMutation } from '../../../store/api/withdrawalApi';

export default function ResetModal() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [resetUserData] = useResetUserDataMutation();

  const handleWithdrawal = async () => {
    try {
      await resetUserData().unwrap();
      window.localStorage.clear();
      window.location.replace('/');
      alert('데이터 초기화 되었습니다.');
    } catch (error) {
      alert('데이터 초기화에 실패했습니다.');
    }
  };

  return (
    <>
      <SettingItem onClick={openModal}>데이터 초기화</SettingItem>
      <Modal isVisible={isModalOpen} onClose={closeModal}>
        <Title>데이터를 초기화 하시겠습니까?</Title>
        <Description>
          초기화 버튼 선택 시 계정은
          <br /> 즉시 초기화 되며 복구되지 않습니다.
        </Description>
        <DeleteButton onClick={handleWithdrawal}>초기화</DeleteButton>
        <CancelButton onClick={closeModal}>취소</CancelButton>
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
const DeleteButton = styled.button`
  width: 180px;
  height: 40px;
  margin: 10px;
  margin-top: 30px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};

  background-color: ${({ theme }) => theme.colors.textBlue};

  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.large};
`;
const CancelButton = styled.button`
  width: 180px;
  height: 40px;

  color: ${({ theme }) => theme.colors.grey};
`;

const SettingItem = styled.button`
  margin: ${({ theme }) => theme.margin.base};

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
