import { useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import Anchor from '@/share/ui/anchor/Anchor';
import { useGetQuestionCategoryTopicListQuery } from '@/store/api/topicApi';

export default function QuizAnchor() {
  const { quizId } = useParams();
  const {
    data: topicList,
    isError,
    isLoading,
  } = useGetQuestionCategoryTopicListQuery(Number(quizId));

  return (
    <Async data={topicList} isLoading={isLoading} isError={isError}>
      {(data) => (
        <Anchor
          anchorList={data
            .map((topic) => topic.topicList)
            .flat()
            .map((topic) => topic.title)}
        />
      )}
    </Async>
  );
}
