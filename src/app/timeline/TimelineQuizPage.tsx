import useQuesryString from '@/share/hook/useQueryString';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Async from '@/share/state/Async';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

import TimelineQuiz from '../../share/timeline/TimelineQuiz';
import TimelineSideMenu from './_component/TimelineSideMenu';

export default function TimelineQuizPage() {
  const { timeline: timelineId, refresh } = useQuesryString();
  const { data: dateList } = useGetTimelineQuery(timelineId);
  return (
    <Layout>
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Async data={dateList}>
          {(dateList) => {
            return (
              <TimelineQuiz
                dateList={[...dateList].sort(() => Math.random() - 0.5)}
                key={timelineId + refresh}
                id={timelineId}
                onNextContent={() => {}}
              />
            );
          }}
        </Async>
      </Layout.Main>
      <Layout.Right></Layout.Right>
    </Layout>
  );
}
