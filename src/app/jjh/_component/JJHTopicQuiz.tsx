import { useSelector } from 'react-redux';

import useQuesryString from '@/share/hook/useQueryString';
import Quiz from '@/share/quiz/Quiz';
import QuizSkeleton from '@/share/quiz/QuizSkeleton';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import { useUpdateProgressMutation } from '@/store/api/jjhApi';
import { useGetTtoKQuestionQuery } from '@/store/api/questionApi';
import { RootState } from '@/store/store';

import useNextContent from '../_hook/useNextContent';

export default function JJHTopicQuiz() {
  const { topic: topicTitle, content: contentNumber } = useQuesryString();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { handleNextContent } = useNextContent();
  const {
    data: TtoKQuestionList,
    isLoading,
    isError,
    error,
  } = useGetTtoKQuestionQuery(topicTitle, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();

  return (
    <Async
      data={TtoKQuestionList}
      isLoading={isLoading}
      loadingComponent={<QuizSkeleton />}
      isError={isError}
      errorComponent={
        <ErrorUI
          error={error}
          message="정주행 문제 불러오기에 실패하였습니다."
        />
      }
    >
      {(quizList) => {
        return (
          <Quiz
            quizList={quizList}
            onNextContent={handleNextContent}
            onFinish={() =>
              isLoggedIn && updateProgres({ contentNumber: contentNumber + 1 })
            }
            isJJH
          />
        );
      }}
    </Async>
  );
}
