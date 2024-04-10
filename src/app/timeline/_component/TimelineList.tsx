import { useNavigate } from 'react-router-dom';

import QuizButton from '@/app/quiz/_component/QuizButton';
import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

export default function TimelineList() {
  const navigate = useNavigate();
  const { timeline: timelineId, title, date } = useQuesryString();
  const {
    data: dateList,
    isLoading,
    isError,
  } = useGetTimelineQuery(timelineId);

  return (
    <Async data={dateList} isLoading={isLoading} isError={isError}>
      {(dateList) => (
        <>
          <ContentBox
            key={title}
            title={title}
            subTitle={date}
            extraButton={
              <QuizButton
                onClick={() =>
                  navigate(
                    `/timeline/quiz?timeline=${timelineId}&title=${title}&date=${date}`,
                  )
                }
              />
            }
          >
            <Timeline>
              {dateList.map((keyword, index) => {
                return (
                  <Timeline.Item
                    dateItem={{
                      date: keyword.dateComment,
                      title: keyword.comment,
                      comment: keyword.keywordList,
                    }}
                    key={index}
                  />
                );
              })}
            </Timeline>
          </ContentBox>
        </>
      )}
    </Async>
  );
}