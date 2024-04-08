import { useContext } from 'react';
import styled, { keyframes, ThemeContext } from 'styled-components';

import fail from '@/assets/images/fail.svg';
import success from '@/assets/images/success.svg';

import useCountAnimation from '../hook/useCountAnimation';

interface ScoreProps {
  totalScore: number;
  score: number;
}

export default function Score({ score, totalScore }: ScoreProps) {
  const theme = useContext(ThemeContext);
  const passThreshold = 0.8;
  const passText = '합격!';
  const failText = '불합격';
  const thresholdPercentage = passThreshold * 100;
  const thresholdScore = Math.ceil(totalScore * passThreshold);
  const isPass = score / totalScore >= passThreshold;
  const title = isPass ? passText : failText;
  const percentage = Math.floor((score / totalScore) * 100);
  const description = isPass
    ? '다음 학습으로 넘어가세요!'
    : `${thresholdPercentage}%(${thresholdScore}/${totalScore})를 넘기지 못했습니다.`;
  const color = isPass ? theme?.colors.blue : theme?.colors.red;
  const image = isPass ? success : fail;
  const count = useCountAnimation(0, percentage);

  return (
    <ScoreContainer>
      <Image src={image} />
      <DescriptionContainer>
        <Title color={color || ''}>{title}</Title>
        <ScoreNumber
          color={color || ''}
        >{`${count}%(${score}/${totalScore})`}</ScoreNumber>
        <Sub>{description}</Sub>
      </DescriptionContainer>
      <Progress>
        <Bar $percentage={percentage} $color={color || ''} />
      </Progress>
    </ScoreContainer>
  );
}

const ScoreContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;

  padding: ${({ theme }) => theme.padding.small};
  padding-bottom: 50px;
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};
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
  $percentage: number;
  $color: string;
}

const Bar = styled.div<BarProps>`
  --progress-width: ${({ $percentage }) => `${$percentage}%`};

  width: 0;
  height: 10px;
  border-radius: 100px;

  background: ${({ $color }) => $color};

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

const ScoreNumber = styled.div<{ color: string }>`
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
