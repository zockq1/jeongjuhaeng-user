import { useMemo } from 'react';

import useQuesryString from '@/share/hook/useQueryString';
import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { getFormattedDateRange } from '@/share/util/getDate';
import { useGetTimelineListQuery, usePrefetch } from '@/store/api/timelineApi';
import { TimelineListModel } from '@/types/timelinetypes';

export default function TimelinePrevNext() {
  const prefetchTimeline = usePrefetch('getTimeline');
  const { timeline: currentTimeline } = useQuesryString();
  const { data: timelineList } = useGetTimelineListQuery();
  const { prev, next } = useMemo(() => {
    let prev: TimelineListModel | undefined;
    let next: TimelineListModel | undefined;

    if (timelineList && timelineList.length > 0) {
      const sortedTimeline = [...timelineList].sort(
        (a, b) => a.startDate - b.startDate,
      );
      const currentIndex = sortedTimeline.findIndex(
        (timeline) => timeline.id === currentTimeline,
      );

      currentIndex !== 0 && (prev = sortedTimeline[currentIndex - 1]);
      currentIndex !== sortedTimeline.length - 1 &&
        (next = sortedTimeline[currentIndex + 1]);
    }
    next && prefetchTimeline(next.id);
    return { prev, next };
  }, [timelineList, currentTimeline, prefetchTimeline]);

  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: getFormattedDateRange(prev.startDate, prev.endDate),
              category: prev.title,
              to: `/timeline?timeline=${prev.id}&title=${
                prev.title
              }&date=${getFormattedDateRange(prev.startDate, prev.endDate)}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      next={
        next
          ? {
              title: getFormattedDateRange(next.startDate, next.endDate),
              category: next.title,
              to: `/timeline?timeline=${next.id}&title=${
                next.title
              }&date=${getFormattedDateRange(next.startDate, next.endDate)}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      toMenu="/timeline-list"
    />
  );
}
