import styled from 'styled-components';

import Logo from '@/share/ui/icon/Logo';

export default function Title() {
  return (
    <TitleContainer>
      <h1>한능검 공부는</h1>
      <br />
      <Logo size={50} />
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 120px;

  & > h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    font-family: Giants-Regular;
  }
`;
