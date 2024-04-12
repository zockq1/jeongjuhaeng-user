import { ReactNode } from 'react';
import styled from 'styled-components';

import { media } from '@/theme/theme';

export default function Title({ children }: { children: ReactNode }) {
  return <TitleContainer>{children}</TitleContainer>;
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 10px 5px 20px;
  padding: 10px;
  border: 2px solid ${({ theme }) => theme.colors.textBlue};
  border-radius: 10px;

  background-color: ${({ theme }) => theme.colors.white};

  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 200%;
  text-align: center;

  font-family: Giants-Regular;

  @media ${media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.large};
  }
`;
