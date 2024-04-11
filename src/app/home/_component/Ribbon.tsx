import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

import { media } from '@/theme/theme';

const RibbonContainer = styled.div`
  overflow: hidden;
  position: absolute;

  width: calc(100%);
  height: 300px;
  padding-top: 50px;

  @media ${media.tablet} {
    padding-top: 30px;
  }

  @media ${media.mobile} {
    padding-top: 0;
  }
`;

const RibbonFlex = styled.div`
  display: flex;
  overflow: hidden;

  border-top: 4px solid #1f2937;
  border-bottom: 4px solid #1f2937;

  background-color: #f3f4f6;
`;

export default function Ribbon() {
  return (
    <RibbonContainer>
      <RibbonFlex
        style={{
          transform: 'translateY(80%) rotate(7deg) scale(1.1)',
        }}
      >
        <TranslateWrapper reverse>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsTop />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsTop />
        </TranslateWrapper>
      </RibbonFlex>
      <RibbonFlex
        style={{
          transform: 'translateY(-20%) rotate(-7deg) scale(1.1)',
        }}
      >
        <TranslateWrapper>
          <LogoItemsMiddle />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsMiddle />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItemsMiddle />
        </TranslateWrapper>
      </RibbonFlex>
      <RibbonFlex
        style={{
          transform: 'translateY(70%) rotate(0deg) scale(1.1)',
        }}
      >
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
        <TranslateWrapper reverse>
          <LogoItemsBottom />
        </TranslateWrapper>
      </RibbonFlex>
    </RibbonContainer>
  );
}

const StyledTranslateWrapper = styled(motion.div)`
  display: flex;

  padding-right: 2px;
  padding-left: 2px;
`;

const TranslateWrapper = ({
  children,
  reverse,
}: {
  children: JSX.Element;
  reverse?: boolean;
}) => {
  return (
    <StyledTranslateWrapper
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </StyledTranslateWrapper>
  );
};

const StyledLogoItem = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  color: black;

  gap: 1rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e5e7eb;
  }

  & > span {
    font-weight: 600;
    font-size: 1.5rem;
    white-space: nowrap;

    text-transform: uppercase;
  }
`;

const LogoItem = ({ Icon, name }: { Icon: ReactNode; name: string }) => {
  return (
    <StyledLogoItem>
      {Icon}
      <span
        style={{
          whiteSpace: 'nowrap',
          fontSize: '1.5rem',
          fontWeight: '600',
          textTransform: 'uppercase',
        }}
      >
        {name}
      </span>
    </StyledLogoItem>
  );
};

const LogoItemsTop = () => (
  <>
    <LogoItem Icon={null} name="구석기시대" />
    <LogoItem Icon={null} name="청동기 시대" />
    <LogoItem Icon={null} name="고구려" />
    <LogoItem Icon={null} name="백제" />
    <LogoItem Icon={null} name="발해" />
    <LogoItem Icon={null} name="후삼국 시대" />
    <LogoItem Icon={null} name="고려" />
    <LogoItem Icon={null} name="조선" />
    <LogoItem Icon={null} name="개항기" />
    <LogoItem Icon={null} name="일제강점기" />
  </>
);

const LogoItemsMiddle = () => (
  <>
    <LogoItem Icon={null} name="서경 천도 운동" />
    <LogoItem Icon={null} name="무신 정권" />
    <LogoItem Icon={null} name="중서문하성" />
    <LogoItem Icon={null} name="몽골의 침입" />
    <LogoItem Icon={null} name="향도" />
    <LogoItem Icon={null} name="임술 농민 봉기" />
    <LogoItem Icon={null} name="성균관" />
    <LogoItem Icon={null} name="병인박해" />
    <LogoItem Icon={null} name="조선 의용군" />
    <LogoItem Icon={null} name="3선 개헌" />
  </>
);

const LogoItemsBottom = () => (
  <>
    <LogoItem Icon={null} name="침류왕" />
    <LogoItem Icon={null} name="신문왕" />
    <LogoItem Icon={null} name="무왕" />
    <LogoItem Icon={null} name="태조 왕건" />
    <LogoItem Icon={null} name="이자겸" />
    <LogoItem Icon={null} name="공민왕" />
    <LogoItem Icon={null} name="세종대왕" />
    <LogoItem Icon={null} name="흥선대원군" />
    <LogoItem Icon={null} name="신채호" />
    <LogoItem Icon={null} name="이승만" />
  </>
);
