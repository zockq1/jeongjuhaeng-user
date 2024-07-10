import { useMemo } from 'react';

import useQuesryString from '@/share/hook/useQueryString';
import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { useGetChapterListQuery } from '@/store/api/chapterApi';
import { usePrefetch } from '@/store/api/topicApi';
import { ChapterModel } from '@/types/chapterTypes';

export default function TopicPrevNext() {
  const prefetchTopic = usePrefetch('getChapterTopicList');
  const { chapter: currentChapter } = useQuesryString();
  const { data: chapterList } = useGetChapterListQuery();
  const { prev, next } = useMemo(() => {
    let prev: ChapterModel | undefined;
    let next: ChapterModel | undefined;
    if (chapterList) {
      chapterList.forEach((chapter) => {
        if (chapter.number === currentChapter - 1) prev = chapter;
        if (chapter.number === currentChapter + 1) next = chapter;
      });
    }
    next && prefetchTopic(next.number);
    return { prev, next };
  }, [chapterList, currentChapter, prefetchTopic]);

  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title,
              category: prev.dateComment,
              to: `/learning/chapter?chapter=${prev.number}&title=${prev.title}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      next={
        next
          ? {
              title: next.title,
              category: next.dateComment,
              to: `/learning/chapter?chapter=${next.number}&title=${next.title}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      toMenu="/learning"
    />
  );
}
