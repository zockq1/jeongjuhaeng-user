import { useParams } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import TimelineQuiz from '@/share/timeline/TimelineQuiz';
import { useUpdateProgressMutation } from '@/store/api/jjhApi';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

import useNextContent from '../_hook/useNextContent';

export default function JJHTimelineQuiz() {
  const { handleNextContent } = useNextContent();
  const [updateProgres] = useUpdateProgressMutation();
  const { refresh } = useQuesryString();

  const { timelineId, contentId } = useParams();
  const {
    data: dateList,
    isError,
    error,
  } = useGetTimelineQuery(Number(timelineId));

  return (
    <Async
      data={dateList}
      isError={isError}
      errorComponent={
        <ErrorUI
          error={error}
          message="정주행 연표 문제 불러오기에 실패하였습니다."
        />
      }
    >
      {(dateList) => {
        return (
          <TimelineQuiz
            dateList={[...dateList].sort(() => Math.random() - 0.5)}
            key={Number(timelineId) + refresh}
            id={Number(timelineId)}
            onNextContent={handleNextContent}
            onFinish={() =>
              updateProgres({ contentNumber: Number(contentId) + 1 })
            }
          />
        );
      }}
    </Async>
  );
}
