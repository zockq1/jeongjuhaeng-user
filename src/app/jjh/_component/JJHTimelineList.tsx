import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

import QuizButton from '../../../share/ui/button/QuizButton';

export default function JJHTimelineList() {
  const navigate = useNavigate();
  const {
    timeline: timelineId,
    title,
    date,
    jjh: jjhNumber,
    content: contentNumber,
  } = useQuesryString();
  const {
    data: dateList,
    isFetching,
    isError,
    error,
  } = useGetTimelineQuery(timelineId);

  return (
    <Async
      data={dateList}
      isLoading={isFetching}
      isError={isError}
      loadingComponent={<ContentBoxSkeleton />}
      errorComponent={
        <ErrorUI
          error={error}
          message="정주행 연표 불러오기에 실패하였습니다."
        />
      }
    >
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
                    `/jeong-ju-haeng/timeline/quiz?jjh=${jjhNumber}&timeline=${timelineId}&content=${contentNumber}&title=${title}&date=${date}`,
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
