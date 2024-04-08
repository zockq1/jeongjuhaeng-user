import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ContentBox from '@/share/ui/content-box/ContentBox';
import Timeline from '@/share/ui/timeline/Timeline';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

import QuizButton from '../../quiz/_component/QuizButton';

export default function JJHTimelineList() {
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
            extraButton={<QuizButton />}
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
