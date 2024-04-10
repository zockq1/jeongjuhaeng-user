import styled from 'styled-components';

import Logo from '@/share/ui/icon/Logo';
import { media } from '@/theme/theme';

import AuthButton from '../AuthButton';
import NavigationBar from '../NavigationBar';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;

  width: 100%;
  height: 80px;
  margin: 0 auto;
  padding: 15px;

  background-color: ${({ theme }) => theme.colors.bg};

  @media ${media.tablet} {
    max-width: 980px;
  }

  @media ${media.desktop} {
    max-width: 1260px;
  }

  & > .logo {
    display: flex;
    flex-basis: 180px;
  }

  & > .auth {
    display: flex;
    flex-basis: 180px;
    justify-content: end;
  }
`;

export default function ExpendedHeader() {
  return (
    <HeaderContainer>
      <div className="logo">
        <Logo size={30} />
      </div>
      <NavigationBar />
      <div className="auth">
        <AuthButton />
      </div>
    </HeaderContainer>
  );
}
