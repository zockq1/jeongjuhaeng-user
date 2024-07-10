import { useParams } from 'react-router-dom';

import MetaData from '@/share/helmet/MetaData';
import useQuesryString from '@/share/hook/useQueryString';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Async from '@/share/state/Async';
import { useGetTimelineQuery } from '@/store/api/timelineApi';

import TimelineQuiz from '../../share/timeline/TimelineQuiz';
import TimelineSideMenu from './_component/TimelineSideMenu';

export default function TimelineQuizPage() {
  const { refresh } = useQuesryString();
  const { timelineId } = useParams();
  const { data: dateList } = useGetTimelineQuery(Number(timelineId));
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 연표 학습 문제"
        description="한국사 능력 검정 시험(한능검) 연표 학습 문제"
      />
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
                key={Number(timelineId) + refresh}
                id={Number(timelineId)}
                onNextContent={() => {}}
              />
            );
          }}
        </Async>
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
