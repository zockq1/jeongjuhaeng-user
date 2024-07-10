import { useEffect } from 'react';

import PrevNextButton from '@/share/ui/button/PrevNextButton';
import getColorAndIcon from '@/share/util/getColorAndIcon';
import { usePrefetch as usePrefetchJJH } from '@/store/api/jjhApi';
import { usePrefetch as usePrefetchTiemline } from '@/store/api/timelineApi';
import { usePrefetch as usePrefetchTopic } from '@/store/api/topicApi';

import useGetJJHCategory from '../_hook/useGetJJHCategory';

export default function JJHPrevNext() {
  const prefetchJJH = usePrefetchJJH('getContentList');
  const prefetchTopic = usePrefetchTopic('getChapterTopicList');
  const prefetchTimeline = usePrefetchTiemline('getTimeline');
  const { nextJJH, prevJJH } = useGetJJHCategory();

  useEffect(() => {
    if (nextJJH?.state !== 'Locked' && nextJJH) {
      prefetchJJH(nextJJH.jjhNumber);
    }

    if (nextJJH?.state !== 'Locked' && nextJJH?.type === 'topic' && nextJJH) {
      prefetchTopic(nextJJH.number);
    }

    if (
      nextJJH?.state !== 'Locked' &&
      nextJJH?.type === 'timeline' &&
      nextJJH
    ) {
      prefetchTimeline(nextJJH.number);
    }
  }, [nextJJH, prefetchJJH, prefetchTopic, prefetchTimeline]);

  return (
    <PrevNextButton
      prev={
        prevJJH
          ? {
              title: prevJJH.title,
              category: prevJJH.category,
              to: prevJJH.to,
              lock: prevJJH.state === 'Locked',
              color: getColorAndIcon(prevJJH.state).color,
            }
          : undefined
      }
      next={
        nextJJH
          ? {
              title: nextJJH.title,
              category: nextJJH.category,
              to: nextJJH.to,
              lock: nextJJH.state === 'Locked',
              color: getColorAndIcon(nextJJH.state).color,
            }
          : undefined
      }
      toMenu="/jeong-ju-haeng"
    />
  );
}
