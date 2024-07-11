import { useEffect } from 'react';

import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import ToggleButton from '@/share/ui/button/ToggleButton';
import { getFormattedDateRange } from '@/share/util/getDate';
import { usePrefetch } from '@/store/api/timelineApi';

import TimelineList from './_component/TimelineList';
import TimelinePrevNext from './_component/TimelinePrevNext';
import TimelineSideMenu from './_component/TimelineSideMenu';
import useGetTimeline from './_hook/useGetTimeline';

export default function LearningTimelinePage() {
  const prefetchTimeline = usePrefetch('getTimeline');
  const { curr, prev, next } = useGetTimeline();
  const title = curr ? curr.title : '';
  const date = curr ? getFormattedDateRange(curr.startDate, curr.endDate) : '';

  useEffect(() => {
    next && prefetchTimeline(next.id);
  }, [next, prefetchTimeline]);

  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 연표 학습"
        description={`한국사 능력 검정 시험(한능검)${title} 연표 학습`}
      />
      <Header />
      <Layout.Left>
        <TimelineSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>연표 - {title}</Title>
        <ToggleButton />
        <TimelineList title={title} date={date} />
        <TimelinePrevNext prev={prev} next={next} />
      </Layout.Main>
      <Layout.Right></Layout.Right>
      <Footer />
    </Layout>
  );
}
