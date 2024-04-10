import { ReactNode } from 'react';
import styled from 'styled-components';

import { media } from '@/theme/theme';

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
  margin: 5px;

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

  @media ${media.expanded} {
    height: calc(100vh - 150px);
  }

  @media ${media.mobile} {
    height: calc(100vh - 150px);
    border: 2px solid ${({ theme }) => theme.colors.textBlue};
    border-radius: 10px;

    background: ${({ theme }) => theme.colors.white};
  }
`;
