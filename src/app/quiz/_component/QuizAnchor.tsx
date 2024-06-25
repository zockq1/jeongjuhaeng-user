import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Anchor from '@/share/ui/anchor/Anchor';
import { useGetQuestionCategoryTopicListQuery } from '@/store/api/jjhApi';

export default function QuizAnchor() {
  const { chapter: chapterNumber } = useQuesryString();
  const {
    data: topicList,
    isError,
    isLoading,
  } = useGetQuestionCategoryTopicListQuery(chapterNumber);

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
