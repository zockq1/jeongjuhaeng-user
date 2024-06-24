import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import PrevNextButton from '@/share/ui/button/PrevNextButton';
import getDate from '@/share/util/getDate';
import { useGetTimelineListQuery } from '@/store/api/timelineApi';
import { TimelineListModel } from '@/types/timelinetypes';

export default function TimelinePrevNext() {
  const navigate = useNavigate();
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
    return { prev, next };
  }, [timelineList, currentTimeline]);

  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: prev.title,
              onClick: () =>
                navigate(
                  `/timeline?timeline=${prev.id}&title=${
                    prev.title
                  }&date=${getDate(prev.startDate).year} ~ ${getDate(prev.endDate).year}`,
                ),
              lock: false,
              color: 'black',
            }
          : undefined
      }
      next={
        next
          ? {
              title: next.title,
              onClick: () =>
                navigate(
                  `/timeline?timeline=${next.id}&title=${
                    next.title
                  }&date=${getDate(next.startDate).year} ~ ${getDate(next.endDate).year}`,
                ),
              lock: false,
              color: 'black',
            }
          : undefined
      }
      onClickMenu={() => navigate('/timeline-list')}
    />
  );
}
