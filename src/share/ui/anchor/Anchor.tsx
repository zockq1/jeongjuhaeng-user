import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface AnchorProps {
  anchorList: string[];
}

export default function Anchor({ anchorList }: AnchorProps) {
  const [activeLink, setActiveLink] = useState<string | null>(anchorList[0]);
  const [lineTop, setLineTop] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 90;

      const activeSection = anchorList.find((anchor) => {
        const element = document.getElementById(anchor);
        if (element) {
          const elementTop = element.offsetTop - threshold;
          const elementBottom = elementTop + element.offsetHeight;

          return scrollPosition >= elementTop && scrollPosition < elementBottom;
        }
        return false;
      });

      setActiveLink((prev) => activeSection || prev);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorList]);

  useEffect(() => {
    const activeElement = document.getElementById(`link-${activeLink || ''}`);
    if (activeElement) {
      setLineTop(activeElement.offsetTop);
    }
  }, [activeLink]);

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const offset = element.offsetTop - 90;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnchorContainer>
      {anchorList.map((anchor) => {
        return (
          <AnchorLink
            key={anchor}
            id={`link-${anchor}`}
            onClick={() => scrollToElement(anchor)}
            $isActive={activeLink === anchor}
          >
            {anchor}
          </AnchorLink>
        );
      })}
      {activeLink && <VerticalLine $top={lineTop} />}
    </AnchorContainer>
  );
}

const AnchorContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: relative;

  width: 100%;
  height: calc(100vh - 245px);
  padding-top: 10px;

  overflow-y: scroll;
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
`;

const AnchorLink = styled.a<{ $isActive: boolean }>`
  width: 200px;
  margin-left: 20px;
  padding: 4px;
  border-left: 2px solid ${({ theme }) => theme.colors.lightGrey};

  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textBlue : theme.colors.grey};
  font-weight: ${({ theme, $isActive }) =>
    $isActive ? theme.fontWeight.medium : theme.fontWeight.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};

  cursor: pointer;
  transition:
    color 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }
`;

const VerticalLine = styled.div<{ $top: number }>`
  position: absolute;
  top: ${({ $top }) => `${$top}px`};
  left: 20px;

  width: 2px;
  height: 20px;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.textBlue};

  transition: all 0.15s ease;
`;
