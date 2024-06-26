import { useMediaQuery } from 'react-responsive';
import styled, { css } from 'styled-components';

import Icon from '../icon/Icon';

type Color = 'red' | 'blue' | 'black' | 'green';

const colorStyles = {
  red: css`
    border: 2px solid ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.red};
  `,
  blue: css`
    border: 2px solid ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};
  `,
  green: css`
    border: 2px solid ${({ theme }) => theme.colors.textBlue};
    color: ${({ theme }) => theme.colors.textBlue};
  `,
  black: css`
    border: 2px solid ${({ theme }) => theme.colors.textBlue};
    color: ${({ theme }) => theme.colors.textBlue};
  `,
};

interface PrevNextButtonProps {
  prev?: {
    onClick: () => void;
    title: string;
    category?: string;
    color: Color;
    lock: boolean;
  };
  next?: {
    onClick: () => void;
    title: string;
    category?: string;
    color: Color;
    lock: boolean;
  };
  onClickMenu: () => void;
}

export default function PrevNextButton({
  prev,
  next,
  onClickMenu,
}: PrevNextButtonProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <PrevNextButtonContainer>
      {prev && (
        <Button
          $color={prev.color}
          $isLock={prev.lock}
          onClick={prev.lock ? () => {} : prev.onClick}
        >
          <Icon icon="angleLeft" size={12} />
          <TextContainer>
            <div className="title">{prev.category}</div>
            {prev.title}
          </TextContainer>
        </Button>
      )}
      {isMobile && (
        <MenuButton onClick={onClickMenu}>
          <Icon icon="menu" size={20} />
        </MenuButton>
      )}
      {next && (
        <Button
          $color={next.color}
          $isLock={next.lock}
          onClick={next.lock ? () => {} : next.onClick}
        >
          <TextContainer>
            <div className="title">{next.category}</div>
            {next.title}
          </TextContainer>
          <Icon icon="angleRight" size={12} />
        </Button>
      )}
    </PrevNextButtonContainer>
  );
}

const PrevNextButtonContainer = styled.div`
  display: flex;

  height: max-content;
  margin: 15px 5px;

  & > button:not(:last-child) {
    margin-right: 5px;
  }

  & > button:not(:first-child) {
    margin-left: 5px;
  }
`;

const Button = styled.button<{
  $color: Color;
  $isLock: boolean;
}>`
  ${({ $color }) => colorStyles[$color]}

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 5px;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  cursor: ${({ $isLock }) => ($isLock ? 'not-allowed' : 'pointer')};
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 120px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const TextContainer = styled.div`
  width: 100%;

  font-weight: ${({ theme }) => theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.small};

  word-break: keep-all;

  & > .title {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }
`;
