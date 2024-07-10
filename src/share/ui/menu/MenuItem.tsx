import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Color } from '@/types/commonTypes';

const colorStyles = {
  red: css`
    color: ${({ theme }) => theme.colors.red};
  `,
  blue: css`
    color: ${({ theme }) => theme.colors.blue};
  `,
  green: css`
    color: ${({ theme }) => theme.colors.textBlue};
  `,
  black: css`
    color: ${({ theme }) => theme.colors.textBlue};
  `,
};

interface MenuItemProps {
  children?: ReactNode;
  color?: Color;
  lock?: boolean;
  selected?: boolean;
  to: string;
}

export default function MenuItem({
  children,
  color = 'black',
  lock = false,
  selected = false,
  to,
}: MenuItemProps) {
  return (
    <MenuItemContainer
      className={selected ? 'selected' : ''}
      $color={color}
      $isLock={lock}
    >
      <Link to={to} onClick={(e) => lock && e.preventDefault()}>
        {children}
      </Link>
    </MenuItemContainer>
  );
}

const MenuItemContainer = styled.li<{
  $color: Color;
  $isLock: boolean;
}>`
  ${({ $color }) => colorStyles[$color]}

  display: flex;
  align-items: center;

  height: max-content;
  margin: 3px;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 10px;

  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: 120%;

  cursor: ${({ $isLock }) => ($isLock ? 'not-allowed' : 'pointer')};

  transition: 0.1s ease;

  &:hover,
  &.selected {
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

    background-color: ${({ theme }) => theme.colors.keywordBg};

    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;
