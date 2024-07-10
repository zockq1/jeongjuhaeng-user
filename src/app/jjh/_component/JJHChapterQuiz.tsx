import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Quiz from '@/share/quiz/Quiz';
import QuizSkeleton from '@/share/quiz/QuizSkeleton';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import { useUpdateProgressMutation } from '@/store/api/jjhApi';
import { useGetKtoTQuestionQuery } from '@/store/api/questionApi';
import { RootState } from '@/store/store';

import useNextContent from '../_hook/useNextContent';

export default function JJHChapterQuiz() {
  const { handleNextContent } = useNextContent();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { chapterId, contentId } = useParams();
  const {
    data: KtoTQuestionList,
    isError,
    error,
    isLoading,
  } = useGetKtoTQuestionQuery(Number(chapterId), {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();

  const handleFinish = () =>
    isLoggedIn && updateProgres({ contentNumber: Number(contentId) + 1 });

  return (
    <Async
      data={KtoTQuestionList}
      isLoading={isLoading}
      loadingComponent={<QuizSkeleton />}
      isError={isError}
      errorComponent={
        <ErrorUI
          error={error}
          message="정주행 단원 마무리 문제 불러오기에 실패하였습니다."
        />
      }
    >
      {(quizList) => {
        return (
          <Quiz
            quizList={quizList}
            onNextContent={handleNextContent}
            onFinish={handleFinish}
            isJJH
          />
        );
      }}
    </Async>
  );
}
