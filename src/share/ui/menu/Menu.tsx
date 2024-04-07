import { ReactNode } from 'react';
import styled from 'styled-components';

import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';

interface MenuProps {
  children?: ReactNode;
}

export default function Menu({ children }: MenuProps) {
  return <MenuContainer>{children}</MenuContainer>;
}

Menu.Item = MenuItem;
Menu.Group = MenuGroup;

const MenuContainer = styled.ul`
  overflow: hidden scroll;

  width: 100%;
  height: calc(100vh - 150px);

  background-color: ${({ theme }) => theme.colors.bg};

  &::-webkit-scrollbar {
    width: 18px;
  }

  &::-webkit-scrollbar-thumb {
    border: 7px solid ${({ theme }) => theme.colors.bg};
    border-radius: 100px;

    background: ${({ theme }) => theme.colors.lightGrey};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
