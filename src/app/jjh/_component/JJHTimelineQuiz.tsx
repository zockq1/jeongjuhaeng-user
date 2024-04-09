import { useSelector } from 'react-redux';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import TimelineQuiz from '@/share/timeline/TimelineQuiz';
import { useUpdateProgressMutation } from '@/store/api/jjhApi';
import { useGetTimelineQuery } from '@/store/api/timelineApi';
import { RootState } from '@/store/store';

import useNextContent from '../_hook/useNextContent';

export default function JJHTimelineQuiz() {
  const { handleNextContent } = useNextContent();
  const [updateProgres] = useUpdateProgressMutation();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const {
    timeline: timelineId,
    refresh,
    content: contentNumber,
  } = useQuesryString();
  const { data: dateList } = useGetTimelineQuery(timelineId);
  return (
    <Async data={dateList}>
      {(dateList) => {
        return (
          <TimelineQuiz
            dateList={[...dateList].sort(() => Math.random() - 0.5)}
            key={timelineId + refresh}
            id={timelineId}
            onNextContent={() => handleNextContent}
            onFinish={() =>
              isLoggedIn && updateProgres({ contentNumber: contentNumber + 1 })
            }
          />
        );
      }}
    </Async>
  );
}
