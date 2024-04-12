import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Modal from '@/share/ui/modal/Modal';
import useModal from '@/share/ui/modal/useModal';
import { logout } from '@/store/slices/authSlice';

import { useWithdrawalMutation } from '../../../store/api/withdrawalApi';

export default function WithdrawalModal() {
  const dispatch = useDispatch();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [withdrawal] = useWithdrawalMutation();

  const handleWithdrawal = async () => {
    try {
      await withdrawal().unwrap();
      window.localStorage.clear();
      dispatch(logout());
      alert('회원 탈퇴 되었습니다.');
      window.location.replace('/');
    } catch (error) {
      alert('회원 탈퇴에 실패했습니다.');
    }
  };

  return (
    <>
      <SettingItem onClick={openModal}>회원 탈퇴</SettingItem>
      <Modal isVisible={isModalOpen} onClose={closeModal}>
        <Title>정말 탈퇴하시겠습니까?</Title>
        <Description>
          회원 탈퇴 버튼 선택 시 계정은
          <br /> 즉시 삭제되며 복구되지 않습니다.
        </Description>
        <DeleteButton onClick={handleWithdrawal}>탈퇴</DeleteButton>
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
