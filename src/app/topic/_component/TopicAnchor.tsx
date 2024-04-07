import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Anchor from '@/share/ui/anchor/Anchor';
import { useGetChapterTopicListQuery } from '@/store/api/jjhApi';

export default function TopicAnchor() {
  const { chapter: chapterNumber } = useQuesryString();
  const { data: topicList } = useGetChapterTopicListQuery(chapterNumber);

  return (
    <Async data={topicList}>
      {(data) => <Anchor anchorList={data.map((topic) => topic.title)} />}
    </Async>
  );
}
