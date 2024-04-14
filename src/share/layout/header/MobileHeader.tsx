import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '@/share/ui/icon/Logo';

import AuthButton from '../AuthButton';
import BackButton from '../BackButton';
import SlideMenu from '../SlideMenu';

export default function MobileHeader() {
  const location = useLocation();
  return (
    <MobileHeaderContainer>
      <ButtonList>
        {location.pathname !== '/' && <BackButton />}
        <SlideMenu />
      </ButtonList>

      <Logo size={18} />
      <AuthButton />
    </MobileHeaderContainer>
  );
}

const MobileHeaderContainer = styled.div`
  display: grid;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 101;

  width: 100%;
  height: 60px;
  padding: 15px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};

  grid-template-columns: 1fr 1fr 1fr;

  & > :nth-child(3) {
    display: flex;
    justify-content: end;
  }
`;

const ButtonList = styled.div`
  display: flex;
  align-items: center;
`;
