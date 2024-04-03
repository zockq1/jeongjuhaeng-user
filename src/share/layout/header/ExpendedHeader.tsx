import styled from 'styled-components';

import Logo from '@/share/ui/icon/Logo';

import AuthButton from '../AuthButton';
import NavigationBar from '../NavigationBar';

const HeaderContainer = styled.header`
  display: grid;
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 99;

  width: 100%;
  height: 80px;
  margin: 0 auto;
  padding: 15px;

  background-color: ${({ theme }) => theme.colors.bg};

  grid-template-columns: 1fr auto 1fr;
  place-items: center;
  transform: translate(-50%, 0);
`;

function ExpendedHeader() {
  return (
    <HeaderContainer>
      <Logo size={30} />
      <NavigationBar />
      <AuthButton />
    </HeaderContainer>
  );
}

export default ExpendedHeader;
