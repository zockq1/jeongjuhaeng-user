import { useEffect } from 'react';

import { usePrefetch } from '@/store/api/jjhApi';
import { usePrefetch as usePrefetchTiemline } from '@/store/api/timelineApi';
import { usePrefetch as usePrefetchTopic } from '@/store/api/topicApi';

import { JJHModel } from './useGetJJHCategory';

export default function usePrefetchJJH(nextJJH?: JJHModel) {
  const prefetchJJH = usePrefetch('getContentList');
  const prefetchTopic = usePrefetchTopic('getChapterTopicList');
  const prefetchTimeline = usePrefetchTiemline('getTimeline');

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
}
