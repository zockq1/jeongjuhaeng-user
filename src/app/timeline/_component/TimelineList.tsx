import { useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

interface TimelineListProps {
  title: string;
  date: string;
}

export default function TimelineList({ title, date }: TimelineListProps) {
  const { timelineId } = useParams();
  const {
    data: dateList,
    isLoading,
    isError,
    error,
  } = useGetTimelineQuery(Number(timelineId));

  return (
    <Async
      data={dateList}
      isLoading={isLoading}
      isError={isError}
      loadingComponent={<ContentBoxSkeleton />}
      errorComponent={
        <ErrorUI error={error} message="연표 불러오기에 실패하였습니다." />
      }
    >
      {(dateList) => (
        <>
          <ContentBox key={title} title={title} subTitle={date}>
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
