import { useEffect } from 'react';

import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { usePrefetch } from '@/store/api/topicApi';

import useGetChapter from '../_hook/useGetChapter';

export default function TopicPrevNext() {
  const prefetchTopic = usePrefetch('getChapterTopicList');

  const { prev, next } = useGetChapter();

  useEffect(() => {
    next && prefetchTopic(next.number);
  }, [next, prefetchTopic]);

  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title,
              category: prev.dateComment,
              to: `/chapter/${prev.number}`,
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
              to: `/chapter/${next.number}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      toMenu="/learning"
    />
  );
}
