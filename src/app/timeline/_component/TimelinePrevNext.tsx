import PrevNextButton from '@/share/ui/button/PrevNextButton';
import { getFormattedDateRange } from '@/share/util/getDate';
import { TimelineListModel } from '@/types/timelinetypes';

interface TimelinePrevNextProps {
  prev?: TimelineListModel;
  next?: TimelineListModel;
}

export default function TimelinePrevNext({
  prev,
  next,
}: TimelinePrevNextProps) {
  return (
    <PrevNextButton
      prev={
        prev
          ? {
              title: getFormattedDateRange(prev.startDate, prev.endDate),
              category: prev.title,
              to: `/timeline/${prev.id}`,
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
              to: `/timeline/${next.id}`,
              lock: false,
              color: 'black',
            }
          : undefined
      }
      toMenu="/timeline"
    />
  );
}
