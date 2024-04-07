import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Color = 'red' | 'blue' | 'black' | 'green';

const colorStyles = {
  red: css`
    color: ${({ theme }) => theme.colors.red};
  `,
  blue: css`
    color: ${({ theme }) => theme.colors.blue};
  `,
  green: css`
    color: ${({ theme }) => theme.colors.green};
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
  onClick?: () => void;
}

export default function MenuItem({
  children,
  color = 'black',
  lock = false,
  selected = false,
  onClick,
}: MenuItemProps) {
  return (
    <MenuItemContainer
      onClick={onClick}
      className={selected ? 'selected' : ''}
      $color={color}
      $isLock={lock}
    >
      {children}
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

  background-color: ${({ theme }) => theme.colors.bg};

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};

  cursor: ${({ $isLock }) => ($isLock ? 'not-allowed' : 'pointer')};

  transition: 0.1s ease;

  &:hover,
  &.selected {
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

    background-color: ${({ theme }) => theme.colors.white};

    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;
