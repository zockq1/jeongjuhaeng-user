import { useSelector } from 'react-redux';

import useQuesryString from '@/share/hook/useQueryString';
import Quiz from '@/share/quiz/Quiz';
import Async from '@/share/state/Async';
import { useUpdateProgressMutation } from '@/store/api/jjhApi';
import { useGetTtoKQuestionQuery } from '@/store/api/questionApi';
import { RootState } from '@/store/store';

import useNextContent from '../_hook/useNextContent';

export default function JJHTopicQuiz() {
  const {
    topic: topicTitle,
    jjh: jjhNumber,
    content: contentNumber,
  } = useQuesryString();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { handleNextContent } = useNextContent();
  const {
    data: TtoKQuestionList,
    isLoading,
    isError,
  } = useGetTtoKQuestionQuery(topicTitle, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProgres] = useUpdateProgressMutation();

  return (
    <Async data={TtoKQuestionList} isLoading={isLoading} isError={isError}>
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
