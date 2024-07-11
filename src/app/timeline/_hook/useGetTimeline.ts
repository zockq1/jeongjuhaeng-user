import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetTimelineListQuery } from '@/store/api/timelineApi';
import { TimelineListModel } from '@/types/timelinetypes';

export default function useGetTimeline() {
  const { timelineId } = useParams();
  const { data: timelineList } = useGetTimelineListQuery();
  const { prev, curr, next } = useMemo(() => {
    let prev: TimelineListModel | undefined;
    let next: TimelineListModel | undefined;
    let curr: TimelineListModel | undefined;

    if (timelineList && timelineList.length > 0) {
      const sortedTimeline = [...timelineList].sort(
        (a, b) => a.startDate - b.startDate,
      );
      const currentIndex = sortedTimeline.findIndex(
        (timeline) => timeline.id === Number(timelineId),
      );

      curr = sortedTimeline[currentIndex];
      currentIndex !== 0 && (prev = sortedTimeline[currentIndex - 1]);
      currentIndex !== sortedTimeline.length - 1 &&
        (next = sortedTimeline[currentIndex + 1]);
    }
    return { prev, curr, next };
  }, [timelineList, timelineId]);

  return { prev, curr, next };
}
