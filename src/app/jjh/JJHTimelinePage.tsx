import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import ToggleButton from '@/share/ui/button/ToggleButton';

import TopicAnchor from '../topic/_component/TopicAnchor';
import JJHPrevNext from './_component/JJHPrevNext';
import JJHSideMenu from './_component/JJHSideMenu';
import JJHTimelineList from './_component/JJHTimelineList';
import useGetJJHCategory from './_hook/useGetJJHCategory';
import usePrefetchJJH from './_hook/usePrefetchJJH';

export default function JJHTimelinePage() {
  const { curr, prev, next } = useGetJJHCategory();
  usePrefetchJJH(next);
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 연표 학습"
        description={`한국사 능력 검정 시험(한능검)${curr?.title} 정주행 연표 학습`}
      />
      <Header />
      <Layout.Left>
        <JJHSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>정주행 - {curr?.title}</Title>
        <ToggleButton />
        <JJHTimelineList />
        <JJHPrevNext prev={prev} next={next} />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
