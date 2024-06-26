import styled from 'styled-components';

import Logo from '@/share/ui/icon/Logo';
import { media } from '@/theme/theme';

const FooterContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 20%;

  width: 100%;
  height: 80%;
  margin: 0 auto;
  padding: 15px;
  border-top: 2px solid ${({ theme }) => theme.colors.textBlue};

  background-color: ${({ theme }) => theme.colors.white};

  font-weight: ${({ theme }) => theme.fontWeight.light};
  font-size: ${({ theme }) => theme.fontSizes.small};

  gap: 10px;

  grid-area: footer;

  @media ${media.tablet} {
    max-width: 980px;
  }

  @media ${media.desktop} {
    max-width: 1260px;
  }

  @media ${media.expanded} {
    left: 50%;

    border-right: 2px solid ${({ theme }) => theme.colors.textBlue};
    border-left: 2px solid ${({ theme }) => theme.colors.textBlue};
    border-radius: 10px 10px 0 0;

    transform: translateX(-50%);
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <Logo size={20} />
      <p>© 2024 정주행 한국사</p>
      <span>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfuW5DObzr9YmH5m96Y7sO_ksTEd27uo4HSDO3ytdW8DTJohg/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          웹 사이트 오류 제보
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfdRFZz0PSsicwWkMoAcOTioDJI9cN3Ijdy3w6iSP6sHr0N3Q/viewform?usp=sf_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          한국사 정보 관련 제보
        </a>
      </span>
    </FooterContainer>
  );
}
