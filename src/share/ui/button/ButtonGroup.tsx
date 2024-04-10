import { ReactNode } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;

  width: 100%;
  height: 40px;
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.keywordBg};

  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.large};

  & > button:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.lightGrey};
  }
`;

const Button = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;

  width: 100%;

  color: ${({ theme }) => theme.colors.textBlue};

  font-family: Giants-Regular;
  word-break: keep-all;
`;

interface ResultButtonUIProps {
  children: ReactNode;
}

export default function ButtonGroup({ children }: ResultButtonUIProps) {
  return <ButtonContainer>{children}</ButtonContainer>;
}

ButtonGroup.Item = Button;
