import { useContext } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';

import fail from '@/assets/images/fail.svg';
import success from '@/assets/images/success.svg';

import useCountAnimation from '../hook/useCountAnimation';

interface TimelineScoreProps {
  wrongCount: number;
}

function TimelineScore({ wrongCount }: TimelineScoreProps) {
  const theme = useContext(ThemeContext);

  const passText = '합격!';
  const failText = '불합격';

  const isPass = wrongCount <= 4;
  const title = isPass ? passText : failText;

  let percentage = Math.floor(100 - wrongCount * 5);
  if (percentage < 0) percentage = 0;

  const description = isPass
    ? '다음 학습으로 넘어가세요!'
    : `틀린 횟수가 4회 이하여야 합니다.`;
  const color = isPass ? theme?.colors.blue : theme?.colors.red;
  const image = isPass ? success : fail;
  const count = useCountAnimation(0, percentage);

  return (
    <ScoreContainer>
      <Image src={image} />
      <DescriptionContainer>
        <Title color={color || ''}>{title}</Title>
        <Score color={color || ''}>{`${count}%(${wrongCount}회 틀림)`}</Score>
        <Sub>{description}</Sub>
      </DescriptionContainer>
      <Progress>
        <Bar percentage={percentage} color={color || ''} />
      </Progress>
    </ScoreContainer>
  );
}

export default TimelineScore;

const ScoreContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;

  margin: ${({ theme }) => theme.margin.base};
  padding: ${({ theme }) => theme.padding.small};
  padding-bottom: 50px;
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};

  @media (width >= 768px) {
    width: auto;
    height: max-content;
    margin: 5px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 60%;
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  bottom: 12px;

  width: calc(100% - 24px);
  height: 20px;
  padding: 0 5px;
  border-radius: 100px;
  box-shadow: inset ${({ theme }) => theme.shadow.defaultShadow};

  background: ${({ theme }) => theme.colors.bg};
`;

const Load = keyframes`
  0% { width: 0; }
  100% { width: var(--progress-width, 0); }
`;

interface BarProps {
  percentage: number;
  color: string;
}

const Bar = styled.div<BarProps>`
  --progress-width: ${({ percentage }) => `${percentage}%`};

  width: 0;
  height: 10px;
  border-radius: 100px;

  background: ${({ color }) => color};

  animation: ${Load} 1s normal forwards;
`;

const Image = styled.img`
  width: 40%;
`;

const Title = styled.div<{ color: string }>`
  width: 100%;
  margin: 10px 0;

  color: ${({ color }) => color};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 30px;
  text-align: center;
  white-space: nowrap;

  font-family: Giants-Regular;
`;

const Score = styled.div<{ color: string }>`
  width: 100%;
  margin: 10px 0;

  color: ${({ color }) => color};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  text-align: center;
  white-space: nowrap;

  font-family: Giants-Regular;
`;

const Sub = styled.div`
  width: 100%;
  margin: 10px 0 20px;

  color: ${({ theme }) => theme.colors.textBlue};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSizes.small};
  text-align: center;

  font-family: Giants-Regular;
  word-break: keep-all;
`;
