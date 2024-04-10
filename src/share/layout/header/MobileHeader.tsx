import styled from 'styled-components';

import Logo from '@/share/ui/icon/Logo';

import AuthButton from '../AuthButton';
import SlideMenu from '../SlideMenu';

export default function MobileHeader() {
  return (
    <MobileHeaderContainer>
      <SlideMenu />
      <Logo size={18} />
      <AuthButton />
    </MobileHeaderContainer>
  );
}

const MobileHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  z-index: 100;

  width: 100%;
  padding: 15px 24px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.textBlue};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};
`;
