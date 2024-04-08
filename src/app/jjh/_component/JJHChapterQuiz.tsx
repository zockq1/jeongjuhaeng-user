import { useSelector } from 'react-redux';

import Quiz from '@/app/quiz/_component/Quiz';
import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
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
    isLoading,
  } = useGetKtoTQuestionQuery(chapterNumber, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Async data={KtoTQuestionList} isLoading={isLoading} isError={isError}>
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
