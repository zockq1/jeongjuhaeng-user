import { ReactNode } from 'react';
import styled from 'styled-components';

import { media } from '@/theme/theme';

import { Desktop, Expanded } from './Responsive';

interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <LayoutContainer>{children}</LayoutContainer>;
}

function Left({ children }: LayoutProps) {
  return (
    <Expanded>
      <LeftContainer>{children}</LeftContainer>
    </Expanded>
  );
}

function Right({ children }: LayoutProps) {
  return (
    <Desktop>
      <RightContainer>{children}</RightContainer>
    </Desktop>
  );
}

function Main({ children }: LayoutProps) {
  return <MainContainer>{children}</MainContainer>;
}

const LayoutContainer = styled.div`
  display: grid;
  position: relative;

  width: fit-content;
  min-height: 100vh;
  margin: 0 auto;

  @media ${media.mobile} {
    width: 100%;
    grid-template:
      'header' 65px
      '   .  ' minmax(calc(100vh - 65px), auto)
      'footer' 90px;
  }

  @media ${media.tablet} {
    grid-template:
      'header header' 90px
      '   .     .   ' minmax(calc(100vh - 90px), auto)
      'footer footer' 90px / 280px minmax(400px, 700px);
  }

  @media ${media.desktop} {
    grid-template:
      'header header header' 90px
      '   .     .      .   ' minmax(calc(100vh - 90px), auto)
      'footer footer footer' 90px / 280px minmax(400px, 700px) 280px;
  }
`;

const LeftContainer = styled.aside`
  position: fixed;

  width: 280px;
  padding: 10px;

  @media ${media.expanded} {
    grid-column: 1/2;
    grid-row: 2/3;
  }
`;

const RightContainer = styled.aside`
  position: fixed;
  padding: 10px;

  @media ${media.desktop} {
    grid-column: 3/4;
    grid-row: 2/3;
  }
`;

const MainContainer = styled.div`
  @media ${media.mobile} {
    padding: 10px;
    grid-row: 2/3;
  }

  @media ${media.expanded} {
    padding: 10px;

    grid-column: 2/3;
    grid-row: 2/3;
  }
`;

Layout.Left = Left;
Layout.Right = Right;
Layout.Main = Main;

export default Layout;
