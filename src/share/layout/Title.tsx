import { ReactNode } from 'react';
import styled from 'styled-components';

export default function Title({ children }: { children: ReactNode }) {
  return <TitleContainer>{children}</TitleContainer>;
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 100;

  margin: 5px;
  margin-bottom: 15px;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 200%;
  text-align: center;

  font-family: Giants-Regular;
`;
