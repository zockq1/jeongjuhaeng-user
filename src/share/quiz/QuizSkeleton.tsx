import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

import getRandomNumber from '@/share/util/getRandomNumber';

import ButtonGroup from '../ui/button/ButtonGroup';
import { StringChoiceContainer } from './choice/StringChoice';
import { DescriptionContainer, DescriptionItem } from './Description';
import QuizLayout from './QuizLayout';
import { Container, ExamNavigation, ResultContainer } from './QuizNavigation';

export default function QuizSkeleton() {
  return (
    <QuizLayout>
      <QuizLayout.Navigation>
        <Container>
          <ExamNavigation>
            <Skeleton
              width="200px"
              height="19px"
              borderRadius="5px"
              style={{ margin: '5px' }}
            />
          </ExamNavigation>
          <ResultContainer>결과</ResultContainer>
        </Container>
      </QuizLayout.Navigation>
      <QuizLayout.Description>
        <DescriptionContainer>
          <DescriptionItem>
            <Skeleton
              width="150px"
              height="19px"
              borderRadius="5px"
              style={{ margin: '5px' }}
            />
          </DescriptionItem>
        </DescriptionContainer>
      </QuizLayout.Description>
      <QuizLayout.Choice>
        {Array.from({ length: 4 }, (_, index) => (
          <>
            <StringChoiceContainer key={index}>
              <Skeleton
                width={`${getRandomNumber(90, 180)}px`}
                height="19px"
                borderRadius="5px"
                style={{ margin: '5px' }}
              />
            </StringChoiceContainer>
            <div style={{ margin: '10px' }} />
          </>
        ))}
      </QuizLayout.Choice>
      <QuizLayout.Button>
        <ButtonGroup>
          <ButtonGroup.Item onClick={() => {}}>정답 확인</ButtonGroup.Item>
        </ButtonGroup>
      </QuizLayout.Button>
    </QuizLayout>
  );
}
