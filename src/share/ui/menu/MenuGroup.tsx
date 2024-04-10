import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

import useToggle from '@/share/hook/useToggle';
import Icon from '@/share/ui/icon/Icon';

type Color = 'red' | 'blue' | 'black' | 'green';

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

interface MenuGroupProps {
  children?: ReactNode;
  color?: Color;
  lock?: boolean;
  open?: boolean;
  title: ReactNode;
  length: number;
}

export default function MenuGroup({
  children,
  color = 'black',
  lock = false,
  open = false,
  title,
  length,
}: MenuGroupProps) {
  const [isOpen, toggle] = useToggle(open);
  return (
    <MenuGroupContainer className={isOpen ? 'selected' : ''}>
      <MenuGroupTitle
        $isLock={lock}
        $color={color}
        className={isOpen ? 'selected' : ''}
        onClick={lock ? () => {} : toggle}
      >
        <Icon size={12} icon={isOpen ? 'angleDown' : 'angleRight'} />
        &nbsp;&nbsp;{title}
      </MenuGroupTitle>
      <MenuItemList
        className={isOpen ? 'selected' : ''}
        $maxHeight={40 * length}
      >
        {children}
      </MenuItemList>
    </MenuGroupContainer>
  );
}

const MenuGroupContainer = styled.li`
  overflow: hidden;

  margin: 6px;
  border: 1px solid transparent;

  transition: 0.1s;

  user-select: none;
`;

const MenuGroupTitle = styled.button<{
  $color: Color;
  $isLock: boolean;
}>`
  ${({ $color }) => colorStyles[$color]}

  display: flex;
  align-items: center;

  width: 100%;
  padding: 10px;

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-align: left;

  cursor: ${({ $isLock }) => ($isLock ? 'not-allowed' : 'pointer')};

  transition: 0.1s ease;
`;

const MenuItemList = styled.ul<{
  $maxHeight: number;
}>`
  overflow: hidden;

  max-height: 0;
  padding-left: 10px;

  transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.selected {
    max-height: ${({ $maxHeight }) => $maxHeight}px;
  }
`;
