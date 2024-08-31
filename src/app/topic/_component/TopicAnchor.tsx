import { useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import Anchor from '@/share/ui/anchor/Anchor';
import { useGetChapterTopicListQuery } from '@/store/api/topicApi';

export default function TopicAnchor() {
  const { chapterId } = useParams();
  const {
    data: topicList,
    isLoading,
    isError,
  } = useGetChapterTopicListQuery(Number(chapterId));

  return (
    <Async data={topicList} isLoading={isLoading} isError={isError}>
      {(data) => <Anchor anchorList={data.map((topic) => topic.title)} />}
    </Async>
  );
}
