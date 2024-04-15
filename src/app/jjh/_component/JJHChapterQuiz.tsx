import { useSelector } from 'react-redux';

import useQuesryString from '@/share/hook/useQueryString';
import Quiz from '@/share/quiz/Quiz';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import { useUpdateProgressMutation } from '@/store/api/jjhApi';
import { useGetKtoTQuestionQuery } from '@/store/api/questionApi';
import { RootState } from '@/store/store';

import useNextContent from '../_hook/useNextContent';

export default function JJHChapterQuiz() {
  const { handleNextContent } = useNextContent();
  const {
    chapter: chapterNumber,
    jjh: jjhNumber,
    content: contentNumber,
  } = useQuesryString();
  const {
    data: KtoTQuestionList,
    isError,
    error,
    isLoading,
  } = useGetKtoTQuestionQuery(chapterNumber, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Async
      data={KtoTQuestionList}
      isLoading={isLoading}
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
            onNextContent={() => handleNextContent(jjhNumber, contentNumber)}
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
