import { useNavigate, useParams } from 'react-router-dom';

import Async from '@/share/state/Async';
import ErrorUI from '@/share/state/Error';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import ContentBoxSkeleton from '@/share/ui/content-box/ContentBoxSkeleton';
import { useGetContentListQuery } from '@/store/api/jjhApi';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

import QuizButton from '../../../share/ui/button/QuizButton';
import useGetJJHCategory from '../_hook/useGetJJHCategory';

export default function JJHTimelineList() {
  const navigate = useNavigate();
  const { jjhId, timelineId } = useParams();
  const { currentJJH } = useGetJJHCategory();

  const {
    data: dateList,
    isFetching,
    isError,
    error,
  } = useGetTimelineQuery(Number(timelineId));
  const { data: contentList, isSuccess } = useGetContentListQuery(
    Number(jjhId),
  );

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
            key={currentJJH?.title}
            title={currentJJH?.title || ''}
            subTitle={currentJJH?.date}
            run={isSuccess && contentList[0].state === 'InProgress'}
            lock={isSuccess && contentList[0].state === 'Locked'}
            extraButton={
              <QuizButton
                onClick={() =>
                  navigate(
                    `/jeong-ju-haeng/${jjhId}/timeline/${timelineId}/quiz`,
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
