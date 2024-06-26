import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

import ResetModal from './ResetModal';
import WithdrawalModal from './WithdrawalModal';

export default function OptionList() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    alert('로그아웃 되었습니다.');
    window.location.replace('/');
  };

  return (
    <OptionListContainer>
      <OptionItem
        onClick={() =>
          window.open(
            'https://docs.google.com/forms/d/e/1FAIpQLSfuW5DObzr9YmH5m96Y7sO_ksTEd27uo4HSDO3ytdW8DTJohg/viewform?usp=sf_link',
            '_blank',
            'noopener,noreferrer',
          )
        }
      >
        웹 사이트 오류 제보
      </OptionItem>
      <Bar />
      <OptionItem
        onClick={() =>
          window.open(
            'https://docs.google.com/forms/d/e/1FAIpQLSfdRFZz0PSsicwWkMoAcOTioDJI9cN3Ijdy3w6iSP6sHr0N3Q/viewform?usp=sf_link',
            '_blank',
            'noopener,noreferrer',
          )
        }
      >
        한국사 정보 관련 제보
      </OptionItem>
      <Bar />
      <OptionItem onClick={() => navigate('/option/privacy')}>
        개인정보 처리방침
      </OptionItem>
      {isLoggedIn && (
        <>
          <Bar />
          <WithdrawalModal />
          <Bar />
          <ResetModal />
          <Bar />
          <OptionItem onClick={handleLogout}>로그아웃</OptionItem>
        </>
      )}
    </OptionListContainer>
  );
}

const OptionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  height: max-content;
  margin: 20px 5px;
  padding: ${({ theme }) => theme.padding.base};
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};
`;

const OptionItem = styled.button`
  margin: ${({ theme }) => theme.margin.base};

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Bar = styled.div`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.bg};
`;
