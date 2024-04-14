import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import kakao from '@/assets/images/kakao.png';
import naver from '@/assets/images/naver.png';
import Button from '@/share/ui/button/Button';
import Icon from '@/share/ui/icon/Icon';
import Logo from '@/share/ui/icon/Logo';
import Modal from '@/share/ui/modal/Modal';
import useModal from '@/share/ui/modal/useModal';
import Popover from '@/share/ui/popover/Popover';
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

export default function AuthButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleLogout = () => {
    dispatch(logout());
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleOption = () => {
    navigate('/option');
  };

  return (
    <>
      {isLoggedIn ? (
        <Popover
          content={
            <Content>
              <Button variant="text" onClick={handleLogout}>
                로그아웃
              </Button>
              <Button variant="text" onClick={handleOption}>
                설정
              </Button>
            </Content>
          }
        >
          <IconButton>
            <Icon icon="user" size={25} color={theme?.colors.textBlue} />
          </IconButton>
        </Popover>
      ) : (
        <>
          <button onClick={openModal}>
            <Icon icon="login" size={25} />
          </button>
          <Modal isVisible={isModalOpen} onClose={closeModal}>
            <Logo size={30} />
            <Title>
              <strong>SNS 계정</strong>으로 <strong>간편하게</strong> 로그인
            </Title>
            <SocialLoginList>
              <Link
                to={`https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_KEY}&redirect_uri=${import.meta.env.VITE_URL}/oauth/kakao/login&response_type=code`}
                replace={true}
              >
                <LogginImageBackground $color="#ffe600" $borderColor="#FCD200">
                  <LogginImage src={kakao} alt="kakao-login" />
                </LogginImageBackground>
              </Link>
              <Link
                to={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${import.meta.env.VITE_NAVER_KEY}&state=${'state'}&redirect_uri=${import.meta.env.VITE_URL}/oauth/naver/login`}
                replace={true}
              >
                <LogginImageBackground $color="#2DBA2D" $borderColor="#00A800">
                  <LogginImage src={naver} alt="naver-login" />
                </LogginImageBackground>
              </Link>
            </SocialLoginList>
          </Modal>
        </>
      )}
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 50px;
  margin-bottom: 15px;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.large};

  & > strong {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;

const SocialLoginList = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;
`;

const LogginImageBackground = styled.div<{
  $color: string;
  $borderColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;
  margin: 5px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: 50%;

  background-color: ${({ $color }) => $color};
`;

const LogginImage = styled.img`
  width: 25px;
  height: 25px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
