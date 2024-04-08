import { useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { media } from '@/theme/theme';
import { QuestionModel } from '@/types/questionTypes';

import Icon from '../ui/icon/Icon';

interface QuestionNuvagationProps {
  onClickMove: (index: number) => void;
  currentNumber: number;
  questionList: QuestionModel[];
  isFinish: boolean;
  isWrongNote?: boolean;
}

export default function QuizNavigation({
  onClickMove,
  currentNumber,
  questionList,
  isFinish,
  isWrongNote = false,
}: QuestionNuvagationProps) {
  const examNavigationRef = useRef<HTMLUListElement | null>(null);

  const calculateScrollPosition = (currentExamNumber: number) => {
    if (examNavigationRef.current) {
      const examItem = examNavigationRef.current.children[currentExamNumber];
      if (examItem) {
        const itemRect = examItem.getBoundingClientRect();
        const containerRect = examNavigationRef.current.getBoundingClientRect();
        const scrollPosition =
          containerRect.left -
          containerRect.width / 2 +
          itemRect.width / 2 +
          5 +
          currentExamNumber * 40;
        return scrollPosition;
      }
    }
    return examNavigationRef.current?.scrollLeft || 0; // 스크롤 위치 계산 실패 시 0으로 설정
  };

  useEffect(() => {
    if (examNavigationRef.current) {
      const scrollPosition = calculateScrollPosition(currentNumber);
      examNavigationRef.current.scrollLeft = scrollPosition;
    }
  }, [currentNumber]);

  return (
    <Container>
      <ExamNavigation ref={examNavigationRef}>
        {questionList.map((item, index) => {
          return (
            <ExamNavigationItem
              key={index}
              $isCurrent={index === currentNumber}
              onClick={() => onClickMove(index)}
              $isCorrect={item.isCorrect}
              $isFinish={item.isFinish}
            >
              {item.number}
              {item.isChecked && (
                <Check $isCorrect={item.isCorrect} $isFinish={item.isFinish} />
              )}
              {!item.isOpen && (
                <Lock>
                  <Icon icon="lock" size={8} />
                </Lock>
              )}
            </ExamNavigationItem>
          );
        })}
      </ExamNavigation>
      {!isWrongNote && (
        <ResultContainer>
          <ExamNavigationItem
            $isCurrent={currentNumber === questionList.length}
            onClick={() => {
              isFinish && onClickMove(questionList.length);
            }}
            $isFinish={false}
            $isCorrect
          >
            결과
          </ExamNavigationItem>
        </ResultContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ResultContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 70px;
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};
`;

const ExamNavigation = styled.ul`
  display: flex;
  flex-direction: row;
  overflow: scroll hidden;

  width: auto;
  margin-right: 10px;
  padding: 5px 15px;
  border: ${({ theme }) => theme.border.default};
  border-radius: ${({ theme }) => theme.borderRadius.xxs};
  box-shadow: ${({ theme }) => theme.shadow.defaultShadow};

  background-color: ${({ theme }) => theme.colors.white};

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media ${media.expanded} {
    flex-wrap: wrap;
    width: 100%;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface ExamNavigationItemProps {
  $isCurrent: boolean;
  $isCorrect: boolean;
  $isFinish: boolean;
}
const popAnimation = keyframes`
  0% {
    transform: scale(0.7);
  }

  33% {
    transform: scale(0.9);
  }

  66% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const ExamNavigationItem = styled.li<ExamNavigationItemProps>`
  flex-shrink: 0;
  position: relative;

  min-width: 41px;
  padding: 5px;
  border-radius: ${({ theme }) => theme.borderRadius.xxs};

  background-color: ${({ theme, $isCurrent }) =>
    $isCurrent && theme.colors.lightGrey};

  color: ${({ theme, $isFinish, $isCorrect }) =>
    $isFinish
      ? $isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.textBlue};
  text-align: center;

  animation: ${({ $isCurrent }) =>
    $isCurrent
      ? css`
          ${popAnimation} 400ms linear
        `
      : ''};

  cursor: pointer;
  list-style-type: none;
`;

interface CheckProps {
  $isCorrect: boolean;
  $isFinish: boolean;
}

const Check = styled.div<CheckProps>`
  --color: ${({ theme, $isCorrect, $isFinish }) =>
    $isFinish
      ? $isCorrect
        ? theme.colors.blue
        : theme.colors.red
      : theme.colors.black};

  position: absolute;
  top: -10%;
  left: 70%;

  width: 6px;
  height: 12px;
  border-right: 2px solid var(--color);
  border-bottom: 2px solid var(--color);

  transform: rotate(45deg);
`;

const Lock = styled.div`
  position: absolute;
  top: -5%;
  left: 65%;
`;
