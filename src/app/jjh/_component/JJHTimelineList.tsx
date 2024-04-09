import { useNavigate } from 'react-router-dom';

import useQuesryString from '@/share/hook/useQueryString';
import Async from '@/share/state/Async';
import Timeline from '@/share/timeline/Timeline';
import ContentBox from '@/share/ui/content-box/ContentBox';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

import QuizButton from '../../quiz/_component/QuizButton';

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
