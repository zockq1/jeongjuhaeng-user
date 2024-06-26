import { motion } from 'framer-motion';
import styled from 'styled-components';

import { media } from '@/theme/theme';

const RibbonContainer = styled.div`
  overflow: hidden;
  position: absolute;

  width: calc(100%);
  height: 350px;
  padding-top: 80px;

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

  border-top: 4px solid ${({ theme }) => theme.colors.textBlue};
  border-bottom: 4px solid ${({ theme }) => theme.colors.textBlue};

  background-color: ${({ theme }) => theme.colors.bg};
`;

export default function Ribbon() {
  return (
    <RibbonContainer>
      <RibbonFlex
        style={{
          transform: 'translateY(80%) rotate(7deg) scale(1.1)',
        }}
      >
        <Translate reverse>
          <ItemsTop />
        </Translate>
        <Translate reverse>
          <ItemsTop />
        </Translate>
        <Translate reverse>
          <ItemsTop />
        </Translate>
      </RibbonFlex>
      <RibbonFlex
        style={{
          transform: 'translateY(-20%) rotate(-7deg) scale(1.1)',
        }}
      >
        <Translate>
          <ItemsMiddle />
        </Translate>
        <Translate>
          <ItemsMiddle />
        </Translate>
        <Translate>
          <ItemsMiddle />
        </Translate>
      </RibbonFlex>
      <RibbonFlex
        style={{
          transform: 'translateY(70%) rotate(0deg) scale(1.1)',
        }}
      >
        <Translate reverse>
          <ItemsBottom />
        </Translate>
        <Translate reverse>
          <ItemsBottom />
        </Translate>
        <Translate reverse>
          <ItemsBottom />
        </Translate>
      </RibbonFlex>
    </RibbonContainer>
  );
}

const TranslateContainer = styled(motion.div)`
  display: flex;

  padding-right: 2px;
  padding-left: 2px;
`;

const Translate = ({
  children,
  reverse,
}: {
  children: JSX.Element;
  reverse?: boolean;
}) => {
  return (
    <TranslateContainer
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </TranslateContainer>
  );
};

const ItemContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  white-space: nowrap;

  text-decoration: none;

  text-transform: uppercase;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

const Item = ({ name }: { name: string }) => {
  return <ItemContainer>{name}</ItemContainer>;
};

const ItemsTop = () => (
  <>
    <Item name="구석기시대" />
    <Item name="청동기 시대" />
    <Item name="고구려" />
    <Item name="백제" />
    <Item name="발해" />
    <Item name="후삼국 시대" />
    <Item name="고려" />
    <Item name="조선" />
    <Item name="개항기" />
    <Item name="일제강점기" />
  </>
);

const ItemsMiddle = () => (
  <>
    <Item name="서경 천도 운동" />
    <Item name="무신 정권" />
    <Item name="중서문하성" />
    <Item name="몽골의 침입" />
    <Item name="향도" />
    <Item name="임술 농민 봉기" />
    <Item name="성균관" />
    <Item name="병인박해" />
    <Item name="조선 의용군" />
    <Item name="3선 개헌" />
  </>
);

const ItemsBottom = () => (
  <>
    <Item name="침류왕" />
    <Item name="신문왕" />
    <Item name="무왕" />
    <Item name="태조 왕건" />
    <Item name="이자겸" />
    <Item name="공민왕" />
    <Item name="세종대왕" />
    <Item name="흥선대원군" />
    <Item name="신채호" />
    <Item name="이승만" />
  </>
);
