import styled from 'styled-components';

import Marquee from '@/share/ui/marquee/Marquee';
import MarqueeItem from '@/share/ui/marquee/MarqueeItem';
import { media } from '@/theme/theme';

export default function HomeMarquee() {
  return (
    <HomeMarqueeContainer>
      <MarqueeFlex
        style={{
          transform: 'translateY(80%) rotate(7deg) scale(1.1)',
        }}
      >
        <Marquee reverse>
          <ItemsTop />
        </Marquee>
        <Marquee reverse>
          <ItemsTop />
        </Marquee>
        <Marquee reverse>
          <ItemsTop />
        </Marquee>
      </MarqueeFlex>
      <MarqueeFlex
        style={{
          transform: 'translateY(-20%) rotate(-7deg) scale(1.1)',
        }}
      >
        <Marquee>
          <ItemsMiddle />
        </Marquee>
        <Marquee>
          <ItemsMiddle />
        </Marquee>
        <Marquee>
          <ItemsMiddle />
        </Marquee>
      </MarqueeFlex>
      <MarqueeFlex
        style={{
          transform: 'translateY(70%) rotate(0deg) scale(1.1)',
        }}
      >
        <Marquee reverse>
          <ItemsBottom />
        </Marquee>
        <Marquee reverse>
          <ItemsBottom />
        </Marquee>
        <Marquee reverse>
          <ItemsBottom />
        </Marquee>
      </MarqueeFlex>
    </HomeMarqueeContainer>
  );
}

const ItemsTop = () => (
  <>
    {[
      '구석기시대',
      '청동기 시대',
      '고구려',
      '백제',
      '발해',
      '후삼국 시대',
      '고려',
      '조선',
      '개항기',
      '일제강점기',
    ].map((name, index) => (
      <MarqueeItem key={index} name={name} />
    ))}
  </>
);

const ItemsMiddle = () => (
  <>
    {[
      '서경 천도 운동',
      '무신 정권',
      '중서문하성',
      '몽골의 침입',
      '향도',
      '임술 농민 봉기',
      '성균관',
      '병인박해',
      '조선 의용군',
      '3선 개헌',
    ].map((name, index) => (
      <MarqueeItem key={index} name={name} />
    ))}
  </>
);

const ItemsBottom = () => (
  <>
    {[
      '침류왕',
      '신문왕',
      '무왕',
      '태조 왕건',
      '이자겸',
      '공민왕',
      '세종대왕',
      '흥선대원군',
      '신채호',
      '이승만',
    ].map((name, index) => (
      <MarqueeItem key={index} name={name} />
    ))}
  </>
);

const HomeMarqueeContainer = styled.div`
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

const MarqueeFlex = styled.div`
  display: flex;
  overflow: hidden;

  border-top: 4px solid ${({ theme }) => theme.colors.textBlue};
  border-bottom: 4px solid ${({ theme }) => theme.colors.textBlue};

  background-color: ${({ theme }) => theme.colors.bg};
`;
