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

  scrollbar-color: ${({ theme }) => theme.colors.lightGrey} transparent;

  /* Firefox */
  scrollbar-width: thin;

  /* WebKit 기반 브라우저 (Chrome, Safari) */
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

  /* Edge 및 기타 브라우저를 위한 추가적인 사용자 정의 스크롤바 */
  & {
    scrollbar-color: ${({ theme }) => theme.colors.lightGrey} transparent;
    scrollbar-width: thin;
  }

  @media ${media.expanded} {
    height: calc(100vh - 245px);
  }

  @media ${media.mobile} {
    border: 2px solid ${({ theme }) => theme.colors.textBlue};
    border-radius: 10px;

    background: ${({ theme }) => theme.colors.white};
  }
`;
