import MetaData from '@/share/helmet/MetaData';
import Footer from '@/share/layout/Footer';
import Header from '@/share/layout/header';
import Layout from '@/share/layout/Layout';
import Title from '@/share/layout/Title';
import ToggleButton from '@/share/ui/button/ToggleButton';

import ChapterSideMenu from './_component/ChapterSideMenu';
import TopicAnchor from './_component/TopicAnchor';
import TopicList from './_component/TopicList';
import TopicPrevNext from './_component/TopicPrevNext';
import useGetChapter from './_hook/useGetChapter';

export default function LearningTopicPage() {
  const { curr } = useGetChapter();
  const title = curr ? curr.title : '';
  return (
    <Layout>
      <MetaData
        title="정주행 한국사 | 단원별 학습"
        description={`한국사 능력 검정 시험(한능검)${title} 단원별 주제 학습`}
      />
      <Header />
      <Layout.Left>
        <ChapterSideMenu />
      </Layout.Left>
      <Layout.Main>
        <Title>단원 - {title}</Title>
        <ToggleButton />
        <TopicList />
        <TopicPrevNext />
      </Layout.Main>
      <Layout.Right>
        <TopicAnchor />
      </Layout.Right>
      <Footer />
    </Layout>
  );
}
